"use client";

import { Button } from "@/components/ui/Button";
import Field from "@/components/ui/Field";
import { TeacherProfileProps } from "@/types";
import {
  teacherLevelTranslations,
  teacherModalityTranslations,
  teacherSubjects,
  teacherSubjectsTranslations,
} from "@/utils/utils";
import axios from "axios";
import { formatPhoneDisplay } from "@/utils/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import Select, { MultiValue } from "react-select";
import { toast } from "react-toastify";

type SubjectOption = { value: string; label: string };
const subjectOptions: SubjectOption[] = teacherSubjects.map((s) => ({
  value: s,
  label: teacherSubjectsTranslations[s],
}));

type FormState = {
  description: string;
  location: string;
  level: string;
  modality: string;
  subjects: string[];
  instagramHandle: string;
};

const emptyForm: FormState = {
  description: "",
  location: "",
  level: "",
  modality: "",
  subjects: [],
  instagramHandle: "",
};

function profileToForm(p: TeacherProfileProps): FormState {
  return {
    description: p.description ?? "",
    location: p.location ?? "",
    level: p.level ?? "",
    modality: p.modality ?? "",
    subjects: p.subjects ?? [],
    instagramHandle: p.instagramHandle ?? "",
  };
}

const TeacherProfilePage = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<TeacherProfileProps | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const submitIsPublicRef = useRef<boolean>(false);

  useEffect(() => {
    axios
      .get("/api/teacher-profiles/me")
      .then(({ data }) => {
        setProfile(data);
        setForm(profileToForm(data));
      })
      .catch(() => router.replace("/"))
      .finally(() => setIsLoading(false));
  }, [router]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleDiscardPhoto = () => {
    setPhotoFile(null);
    setPhotoPreview(null);
  };

  const handleDeletePhoto = async () => {
    setIsSubmitting(true);
    const toastId = toast.loading("Eliminando foto...");
    try {
      const { data } = await axios.delete(
        "/api/teacher-profiles/me/profile-picture",
      );
      setProfile(data);
      setForm(profileToForm(data));
      toast.update(toastId, {
        render: "Foto eliminada",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? (error.response?.data?.error ?? "Error al eliminar foto")
        : "Error al eliminar foto";
      toast.update(toastId, {
        render: message,
        type: "error",
        isLoading: false,
        autoClose: 4000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentPhoto = photoPreview ?? profile?.profilePicture ?? null;

  const hasPhoto = !!(photoFile || profile?.profilePicture);
  const canEnable = hasPhoto;

  const missingItems = [!hasPhoto && "foto de perfil"].filter(Boolean);

  const submit = (targetIsPublic: boolean) => {
    submitIsPublicRef.current = targetIsPublic;
    formRef.current?.requestSubmit();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const targetIsPublic = submitIsPublicRef.current;
    if (targetIsPublic && !canEnable) return;
    setIsSubmitting(true);

    const formData = new FormData();
    if (photoFile) formData.append("profilePicture", photoFile);
    formData.append("description", form.description);
    formData.append("location", form.location);
    formData.append("level", form.level);
    formData.append("modality", form.modality);
    formData.append("subjects", JSON.stringify(form.subjects));
    formData.append("instagramHandle", form.instagramHandle);
    formData.append("isPublic", String(targetIsPublic));

    const toastId = toast.loading(
      targetIsPublic ? "Guardando perfil..." : "Deshabilitando perfil...",
    );
    try {
      const { data } = await axios.put("/api/teacher-profiles/me", formData);
      setProfile(data);
      setForm(profileToForm(data));
      setPhotoFile(null);
      setPhotoPreview(null);
      toast.update(toastId, {
        render: targetIsPublic
          ? data.isPublic
            ? "Perfil público activo"
            : "Cambios guardados"
          : "Perfil deshabilitado",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? (error.response?.data?.error ?? "Error al guardar")
        : "Error al guardar";
      toast.update(toastId, {
        render: message,
        type: "error",
        isLoading: false,
        autoClose: 4000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return null;
  if (!profile) return null;

  const isPublic = profile.isPublic;

  return (
    <section className="ui-form-shell max-w-2xl">
      <div className="ui-panel p-6 sm:p-8 lg:p-10">
        <div className="ui-form-header">
          <p className="ui-eyebrow">Mi cuenta</p>
          <div className="space-y-3">
            <h1 className="ui-form-title">Perfil de profe</h1>
            <p className="ui-form-description">
              Configurá tu perfil docente. Una vez habilitado, aparecerás en el
              listado público de clases.
            </p>
          </div>
        </div>

        <form ref={formRef} className="ui-form-grid" onSubmit={handleSubmit}>
          {/* Read-only user data */}
          <div className="rounded-2xl border border-black/10 bg-black/5 p-4 dark:border-white/10 dark:bg-white/5">
            <p className="ui-eyebrow mb-2">Datos de tu cuenta</p>
            <div className="space-y-1 text-sm text-slate-700 dark:text-slate-300">
              <p className="font-medium">
                {profile.user.firstName} {profile.user.lastName}
              </p>
              <p>{profile.user.email}</p>
              <p>{formatPhoneDisplay(profile.user.phone ?? "")}</p>
            </div>
            <button
              type="button"
              className="mt-3 text-xs text-slate-500 underline underline-offset-2 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 p-0"
              onClick={() => router.push("/contacto?subject=userDataChange")}
            >
              Modificar datos personales
            </button>
          </div>

          {/* Profile picture */}
          <Field htmlFor="profilePicture" label="Foto de perfil">
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                {currentPhoto ? (
                  <Image
                    src={currentPhoto}
                    alt="Preview"
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                ) : (
                  <span className="flex h-full w-full items-center justify-center text-2xl font-semibold text-slate-400">
                    {profile.user.firstName[0]}
                  </span>
                )}
              </div>
              <input
                ref={fileInputRef}
                id="profilePicture"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
              />
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {currentPhoto ? "Cambiar foto" : "Subir foto"}
                </Button>
                {photoPreview && (
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleDiscardPhoto}
                  >
                    Descartar
                  </Button>
                )}
                {!photoPreview && profile.profilePicture && (
                  <Button
                    type="button"
                    variant="danger"
                    disabled={isSubmitting}
                    onClick={handleDeletePhoto}
                  >
                    Eliminar foto
                  </Button>
                )}
              </div>
            </div>
          </Field>

          {/* Description */}
          <Field htmlFor="description" label="Descripción">
            <textarea
              className="ui-textarea"
              id="description"
              name="description"
              maxLength={600}
              placeholder="Contá un poco sobre vos y tu manera de enseñar..."
              onChange={handleChange}
              value={form.description}
            />
          </Field>

          {/* Subjects */}
          <Field label="Materias">
            <Select<SubjectOption, true>
              isMulti
              unstyled
              options={subjectOptions}
              value={subjectOptions.filter((o) => form.subjects.includes(o.value))}
              onChange={(selected: MultiValue<SubjectOption>) =>
                setForm((f) => ({ ...f, subjects: selected.map((o) => o.value) }))
              }
              placeholder="Seleccioná materias..."
              noOptionsMessage={() => "Sin opciones"}
              classNames={{
                control: ({ isFocused }) =>
                  `min-h-[2.5rem] w-full rounded-2xl border border-black/10 bg-white/50 px-3 py-2 dark:border-white/10 dark:bg-slate-900/40${isFocused ? " ring-2 ring-slate-400 ring-offset-2 dark:ring-slate-500 dark:ring-offset-slate-950" : ""}`,
                valueContainer: () => "flex flex-wrap gap-1",
                multiValue: () =>
                  "ui-chip border-emerald-600/40 bg-emerald-600/15 text-emerald-700 dark:border-emerald-400/40 dark:bg-emerald-400/15 dark:text-emerald-300",
                multiValueLabel: () => "px-1 text-xs",
                multiValueRemove: () =>
                  "cursor-pointer rounded-full px-1 hover:bg-emerald-600/20 dark:hover:bg-emerald-400/20",
                indicatorsContainer: () => "shrink-0",
                clearIndicator: () =>
                  "cursor-pointer p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200",
                dropdownIndicator: () =>
                  "cursor-pointer p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200",
                menu: () =>
                  "z-50 mt-1 overflow-hidden rounded-2xl border border-black/10 bg-white/90 shadow-xl backdrop-blur-sm dark:border-white/10 dark:bg-slate-900/90",
                menuList: () => "py-1",
                option: ({ isFocused, isSelected }) =>
                  `cursor-pointer px-4 py-2.5 text-sm${isSelected ? " font-medium text-emerald-700 dark:text-emerald-300" : isFocused ? " bg-black/5 dark:bg-white/5" : ""}`,
                placeholder: () => "text-sm text-slate-400 dark:text-slate-500",
                input: () => "text-sm",
                noOptionsMessage: () => "px-4 py-2.5 text-sm text-slate-500",
              }}
            />
          </Field>

          {/* Level */}
          <Field htmlFor="level" label="Nivel de alumno">
            <select
              className="ui-select"
              id="level"
              name="level"
              value={form.level}
              onChange={handleChange}
            >
              <option value="">Seleccioná un nivel</option>
              {Object.entries(teacherLevelTranslations).map(([v, label]) => (
                <option key={v} value={v}>
                  {label}
                </option>
              ))}
            </select>
          </Field>

          {/* Modality */}
          <Field htmlFor="modality" label="Modalidad">
            <select
              className="ui-select"
              id="modality"
              name="modality"
              value={form.modality}
              onChange={handleChange}
            >
              <option value="">Seleccioná modalidad</option>
              {Object.entries(teacherModalityTranslations).map(([v, label]) => (
                <option key={v} value={v}>
                  {label}
                </option>
              ))}
            </select>
          </Field>

          {/* Location */}
          <Field htmlFor="location" label="Zona / Ubicación">
            <input
              className="ui-input"
              id="location"
              name="location"
              maxLength={50}
              placeholder="Ej.: Palermo, CABA"
              type="text"
              value={form.location}
              onChange={handleChange}
            />
          </Field>

          {/* Contact options */}
          <fieldset className="space-y-3">
            <legend className="ui-field-label">
              Medios de contacto públicos
            </legend>

            <Field htmlFor="instagramHandle" label="Instagram">
              <div className="flex items-center gap-2">
                <span className="text-slate-500 dark:text-slate-400">@</span>
                <input
                  className="ui-input"
                  id="instagramHandle"
                  name="instagramHandle"
                  maxLength={50}
                  placeholder="tu-usuario"
                  type="text"
                  value={form.instagramHandle.replace(/^@/, "")}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      instagramHandle: e.target.value,
                    }))
                  }
                />
              </div>
            </Field>

          </fieldset>

          {/* Action buttons */}
          <div className="border-t border-black/10 pt-4 dark:border-white/10">
            {!canEnable && (
              <p className="mb-3 text-sm text-slate-500 dark:text-slate-400">
                Para habilitar tu perfil necesitás agregar:{" "}
                {missingItems.join(" y ")}.
              </p>
            )}

            <div className="ui-form-actions">
              {isPublic ? (
                <>
                  <Button
                    disabled={isSubmitting || !canEnable}
                    type="button"
                    onClick={() => submit(true)}
                  >
                    Guardar perfil público
                  </Button>
                  <Button
                    disabled={isSubmitting}
                    type="button"
                    variant="danger"
                    onClick={() => submit(false)}
                  >
                    Deshabilitar perfil
                  </Button>
                </>
              ) : (
                <Button
                  disabled={isSubmitting || !canEnable}
                  fullWidth
                  type="button"
                  onClick={() => submit(true)}
                >
                  Habilitar perfil de profe
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default TeacherProfilePage;
