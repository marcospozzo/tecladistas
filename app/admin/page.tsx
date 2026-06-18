"use client";

import { Button } from "@/components/ui/Button";
import Field from "@/components/ui/Field";
import FileInput from "@/components/ui/FileInput";
import { difficultyMap, genreMap } from "@/utils/sheetMusic";
import axios from "axios";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";

type Tab = "crear" | "eliminar" | "partituras";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState<Tab>("crear");
  const [createData, setCreateData] = useState({ displayName: "", phone: "+549" });
  const [deleteData, setDeleteData] = useState({ phone: "+549" });
  const [sheetFile, setSheetFile] = useState<File | null>(null);
  const [sheetForm, setSheetForm] = useState({
    title: "",
    composer: "",
    genre: "",
    difficulty: "",
    year: "",
    fileName: "",
  });

  const handleCreateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCreateData({ ...createData, [event.target.name]: event.target.value });
  };

  const handleCreateSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("displayName", createData.displayName);
    formData.append("phone", createData.phone);

    const toastId = toast.loading("Creando...");
    try {
      const { data } = await axios.post<{ success: string; count: number }>(
        "/api/users/whitelisted",
        formData,
      );
      setCreateData({ displayName: "", phone: "+549" });
      toast.update(toastId, {
        render: `Usuario creado — ${data.count} en lista`,
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
      const { data } = await axios.delete<{ success: string; count: number }>(
        "/api/users/whitelisted",
        { data: formData },
      );
      setDeleteData({ phone: "+549" });
      toast.update(toastId, {
        render: `Usuario eliminado — ${data.count} en lista`,
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

  const handleSheetFormChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setSheetForm({ ...sheetForm, [event.target.name]: event.target.value });
  };

  const handleSheetSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!sheetFile) return;

    const formData = new FormData();
    formData.append("file", sheetFile);
    if (sheetForm.fileName) formData.append("fileName", sheetForm.fileName);
    if (sheetForm.title) formData.append("title", sheetForm.title);
    if (sheetForm.composer) formData.append("composer", sheetForm.composer);
    if (sheetForm.genre) formData.append("genre", sheetForm.genre);
    if (sheetForm.difficulty) formData.append("difficulty", sheetForm.difficulty);
    if (sheetForm.year) formData.append("year", sheetForm.year);

    const toastId = toast.loading("Subiendo partitura...");
    try {
      await axios.post("/api/sheet-music", formData);
      setSheetFile(null);
      setSheetForm({ title: "", composer: "", genre: "", difficulty: "", year: "", fileName: "" });
      toast.update(toastId, {
        render: "Partitura subida",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? (error.response?.data?.error ?? "Error al subir partitura")
        : "Error al subir partitura";
      toast.update(toastId, {
        render: message,
        type: "error",
        isLoading: false,
        autoClose: 4000,
      });
    }
  };

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
          {(["crear", "eliminar", "partituras"] as Tab[]).map((tab) => (
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
              {tab === "crear"
                ? "Crear usuario"
                : tab === "eliminar"
                  ? "Eliminar usuario"
                  : "Subir partitura"}
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
        {activeTab === "partituras" && (
          <form className="ui-form-grid" onSubmit={handleSheetSubmit}>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Subí un PDF a S3 y registralo en el catálogo de partituras.
            </p>
            <Field htmlFor="sheetFile" label="Archivo PDF">
              <FileInput
                accept=".pdf,application/pdf"
                id="sheetFile"
                name="sheetFile"
                onChange={(e) => setSheetFile(e.target.files?.[0] ?? null)}
                required
              />
            </Field>
            <Field htmlFor="sheetTitle" label="Título">
              <input
                className="ui-input"
                id="sheetTitle"
                name="title"
                onChange={handleSheetFormChange}
                placeholder="Título de la partitura"
                type="text"
                value={sheetForm.title}
              />
            </Field>
            <Field htmlFor="sheetComposer" label="Compositor">
              <input
                className="ui-input"
                id="sheetComposer"
                name="composer"
                onChange={handleSheetFormChange}
                placeholder="Nombre del compositor"
                type="text"
                value={sheetForm.composer}
              />
            </Field>
            <Field htmlFor="sheetGenre" label="Género">
              <select
                className="ui-select"
                id="sheetGenre"
                name="genre"
                onChange={handleSheetFormChange}
                value={sheetForm.genre}
              >
                <option value="">— Sin especificar —</option>
                {Object.entries(genreMap).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </Field>
            <Field htmlFor="sheetDifficulty" label="Dificultad">
              <select
                className="ui-select"
                id="sheetDifficulty"
                name="difficulty"
                onChange={handleSheetFormChange}
                value={sheetForm.difficulty}
              >
                <option value="">— Sin especificar —</option>
                {Object.entries(difficultyMap).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </Field>
            <Field htmlFor="sheetYear" label="Año">
              <input
                className="ui-input"
                id="sheetYear"
                max={new Date().getFullYear()}
                min={1}
                name="year"
                onChange={handleSheetFormChange}
                placeholder="Año de publicación"
                type="number"
                value={sheetForm.year}
              />
            </Field>
            <Field htmlFor="sheetFileName" label="Nombre de archivo">
              <input
                className="ui-input"
                id="sheetFileName"
                name="fileName"
                onChange={handleSheetFormChange}
                placeholder="Se usará el nombre del archivo subido"
                type="text"
                value={sheetForm.fileName}
              />
            </Field>
            <div className="ui-form-actions">
              <Button disabled={!sheetFile} fullWidth type="submit">
                Subir partitura
              </Button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default AdminPanel;
