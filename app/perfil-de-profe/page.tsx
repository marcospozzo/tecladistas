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
import { parsePhoneNumberWithError } from "libphonenumber-js";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

type FormState = {
  description: string;
  location: string;
  level: string;
  modality: string;
  subjects: string[];
  instagramHandle: string;
  showEmail: boolean;
  showPhone: boolean;
};

const emptyForm: FormState = {
  description: "",
  location: "",
  level: "",
  modality: "",
  subjects: [],
  instagramHandle: "",
  showEmail: false,
  showPhone: false,
};

function formatPhone(phone: string): string {
  try {
    const normalized = phone.startsWith("+") ? phone : `+${phone}`;
    return parsePhoneNumberWithError(normalized).formatInternational();
  } catch {
    return phone;
  }
}

function profileToForm(p: TeacherProfileProps): FormState {
  return {
    description: p.description ?? "",
    location: p.location ?? "",
    level: p.level ?? "",
    modality: p.modality ?? "",
    subjects: p.subjects ?? [],
    instagramHandle: p.instagramHandle ?? "",
    showEmail: p.showEmail ?? false,
    showPhone: p.showPhone ?? false,
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

  const toggleSubject = (subject: string) => {
    setForm((f) => ({
      ...f,
      subjects: f.subjects.includes(subject)
        ? f.subjects.filter((s) => s !== subject)
        : [...f.subjects, subject],
    }));
  };

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const currentPhoto = photoPreview ?? profile?.profilePicture ?? null;

  const hasPhoto = !!(photoFile || profile?.profilePicture);
  const hasContact = !!(
    form.instagramHandle.trim() ||
    form.showEmail ||
    form.showPhone
  );
  const canEnable = hasPhoto && hasContact;

  const missingItems = [
    !hasPhoto && "foto de perfil",
    !hasContact && "al menos un medio de contacto",
  ].filter(Boolean);

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
    formData.append("showEmail", String(form.showEmail));
    formData.append("showPhone", String(form.showPhone));
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
              Configurá tu oferta docente. Una vez habilitado, aparecerás en el
              directorio público de clases.
            </p>
          </div>
        </div>

        <form
          ref={formRef}
          className="ui-form-grid"
          onSubmit={handleSubmit}
        >
          {/* Read-only user data */}
          <div className="rounded-2xl border border-black/10 bg-black/5 p-4 dark:border-white/10 dark:bg-white/5">
            <p className="ui-eyebrow mb-2">Datos de tu cuenta</p>
            <div className="space-y-1 text-sm text-slate-700 dark:text-slate-300">
              <p className="font-medium">
                {profile.user.firstName} {profile.user.lastName}
              </p>
              <p>{profile.user.email}</p>
              <p>{formatPhone(profile.user.phone ?? "")}</p>
            </div>
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
              <Button
                type="button"
                variant="secondary"
                onClick={() => fileInputRef.current?.click()}
              >
                {currentPhoto ? "Cambiar foto" : "Subir foto"}
              </Button>
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
          <Field htmlFor="subjects" label="Materias">
            <div className="flex flex-wrap gap-2">
              {teacherSubjects.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => toggleSubject(s)}
                  className={`ui-chip cursor-pointer transition-colors ${
                    form.subjects.includes(s)
                      ? "border-emerald-600/40 bg-emerald-600/15 text-emerald-700 dark:border-emerald-400/40 dark:bg-emerald-400/15 dark:text-emerald-300"
                      : "hover:bg-black/10 dark:hover:bg-white/15"
                  }`}
                >
                  {teacherSubjectsTranslations[s]}
                </button>
              ))}
            </div>
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
            <legend className="ui-field-label">Medios de contacto públicos</legend>

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

            <div className="ui-checkbox-row">
              <input
                className="ui-checkbox"
                type="checkbox"
                id="showEmail"
                name="showEmail"
                checked={form.showEmail}
                onChange={handleChange}
              />
              <label htmlFor="showEmail" className="text-sm">
                Mostrar mi email públicamente{" "}
                <span className="text-slate-500 dark:text-slate-400">
                  ({profile.user.email})
                </span>
              </label>
            </div>

            <div className="ui-checkbox-row">
              <input
                className="ui-checkbox"
                type="checkbox"
                id="showPhone"
                name="showPhone"
                checked={form.showPhone}
                onChange={handleChange}
              />
              <label htmlFor="showPhone" className="text-sm">
                Mostrar mi teléfono públicamente{" "}
                <span className="text-slate-500 dark:text-slate-400">
                  ({formatPhone(profile.user.phone ?? "")})
                </span>
              </label>
            </div>
          </fieldset>

          {/* Action buttons */}
          <div className="border-t border-black/10 pt-4 dark:border-white/10">
            {!isPublic && !canEnable && (
              <p className="mb-3 text-sm text-slate-500 dark:text-slate-400">
                Para habilitar tu perfil necesitás agregar:{" "}
                {missingItems.join(" y ")}.
              </p>
            )}

            <div className="ui-form-actions">
              {isPublic ? (
                <>
                  <Button
                    disabled={isSubmitting}
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
