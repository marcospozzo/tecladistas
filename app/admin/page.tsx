"use client";

import { Button } from "@/components/ui/Button";
import Field from "@/components/ui/Field";
import axios from "axios";
import { useRouter } from "next/navigation";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

type Tab = "crear" | "eliminar";

const AdminPanel = () => {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("crear");
  const [createData, setCreateData] = useState({ displayName: "", phone: "+549" });
  const [deleteData, setDeleteData] = useState({ phone: "+549" });

  useEffect(() => {
    axios
      .get("/api/admin")
      .then(() => setIsAuthorized(true))
      .catch(() => {
        setIsAuthorized(false);
        router.replace("/");
      });
  }, [router]);

  const handleCreateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCreateData({ ...createData, [event.target.name]: event.target.value });
  };

  const fetchCount = async (): Promise<number> => {
    const { data } = await axios.get<{ count: number }>(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/count-whitelisted-users`,
    );
    return data.count;
  };

  const handleCreateSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("displayName", createData.displayName);
    formData.append("phone", createData.phone);

    const toastId = toast.loading("Creando...");
    try {
      await axios.post("/api/users/whitelisted", formData);
      setCreateData({ displayName: "", phone: "+549" });
      const count = await fetchCount();
      toast.update(toastId, {
        render: `Usuario creado — ${count} en lista`,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? (error.response?.data?.error ?? "Error al crear usuario")
        : "Error al crear usuario";
      toast.update(toastId, {
        render: message,
        type: "error",
        isLoading: false,
        autoClose: 4000,
      });
    }
  };

  const handleDeleteSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("phone", deleteData.phone);

    const toastId = toast.loading("Eliminando...");
    try {
      await axios.delete("/api/users/whitelisted", { data: formData });
      setDeleteData({ phone: "+549" });
      const count = await fetchCount();
      toast.update(toastId, {
        render: `Usuario eliminado — ${count} en lista`,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? (error.response?.data?.error ?? "Error al eliminar usuario")
        : "Error al eliminar usuario";
      toast.update(toastId, {
        render: message,
        type: "error",
        isLoading: false,
        autoClose: 4000,
      });
    }
  };

  if (!isAuthorized) return null;

  return (
    <section className="ui-form-shell max-w-2xl">
      <div className="ui-panel p-6 sm:p-8 lg:p-10">
        <div className="ui-form-header">
          <p className="ui-eyebrow">Administración</p>
          <div className="space-y-3">
            <h1 className="ui-form-title">Panel de administración</h1>
            <p className="ui-form-description">
              Gestioná usuarios habilitados para ingresar a la plataforma.
            </p>
          </div>
        </div>

        <div className="mb-6 flex border-b border-black/10 dark:border-white/10">
          {(["crear", "eliminar"] as Tab[]).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-4 pb-3 text-sm font-semibold transition-colors ${
                activeTab === tab
                  ? "border-b-2 border-emerald-600 text-emerald-600 dark:border-emerald-400 dark:text-emerald-400"
                  : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
              }`}
            >
              {tab === "crear" ? "Crear usuario" : "Eliminar usuario"}
            </button>
          ))}
        </div>

        {activeTab === "crear" && (
          <form className="ui-form-grid" onSubmit={handleCreateSubmit}>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Alta manual de un usuario habilitado para ingresar.
            </p>
            <Field htmlFor="displayName" label="Nombre">
              <input
                className="ui-input"
                id="displayName"
                name="displayName"
                onChange={handleCreateChange}
                placeholder="Nombre"
                type="text"
                value={createData.displayName}
              />
            </Field>
            <Field htmlFor="createPhone" label="WhatsApp">
              <PhoneInput
                className="ui-phone-input"
                countryCallingCodeEditable={false}
                defaultCountry="AR"
                id="createPhone"
                international
                onChange={(value) =>
                  setCreateData({ ...createData, phone: value ?? "" })
                }
                value={createData.phone}
              />
            </Field>
            <div className="ui-form-actions">
              <Button fullWidth type="submit">
                Crear usuario
              </Button>
            </div>
          </form>
        )}

        {activeTab === "eliminar" && (
          <form className="ui-form-grid" onSubmit={handleDeleteSubmit}>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Eliminá una autorización vigente usando el número de teléfono
              asociado.
            </p>
            <Field htmlFor="deletePhone" label="WhatsApp">
              <PhoneInput
                className="ui-phone-input"
                countryCallingCodeEditable={false}
                defaultCountry="AR"
                id="deletePhone"
                international
                onChange={(value) => setDeleteData({ phone: value ?? "" })}
                value={deleteData.phone}
              />
            </Field>
            <div className="ui-form-actions">
              <Button fullWidth type="submit" variant="danger">
                Eliminar usuario
              </Button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default AdminPanel;
