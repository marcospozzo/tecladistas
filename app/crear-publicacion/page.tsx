"use client";

import { SaleRentSwitchButton } from "@/components";
import { Button } from "@/components/ui/Button";
import Field from "@/components/ui/Field";
import FileInput from "@/components/ui/FileInput";
import FormShell from "@/components/ui/FormShell";
import { ProductProps } from "@/types";
import {
  PRODUCT_LOCATION_MAX_LENGTH,
  PRODUCT_YEAR_MAX_LENGTH,
  ProductFormErrors,
  ProductFormMode,
  ProductFormState,
  ProductFormTextField,
  createEmptyProductFormState,
  getProductFormDirtySnapshot,
  normalizeProductFormField,
  normalizeProductFormState,
  productToFormState,
  sanitizeProductFormTextInput,
  setProductFormListingType,
  validateProductForm,
} from "@/utils/productForm";
import { constants, formText, imageTypes, placeholders } from "@/utils/utils";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ChangeEvent,
  FormEvent,
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "react-toastify";

const IMAGE_MAX_SIZE_MB = 20;
const ACCEPTED_IMAGE_TYPES = imageTypes.map((type) => type.toLowerCase());
const IMAGE_ACCEPT = ACCEPTED_IMAGE_TYPES.map((type) => `.${type}`).join(",");
const IMAGE_DESCRIPTION = `Formatos: ${imageTypes.join(", ")}. Máx. ${IMAGE_MAX_SIZE_MB} MB.`;
const UNSAVED_CHANGES_MESSAGE = "Se van a perder los cambios no guardados.";
const INVALID_FORM_MESSAGE = "Revisá los campos marcados.";

function getFileExtension(fileName: string) {
  const segments = fileName.split(".");

  return segments.length > 1 ? (segments.pop()?.toLowerCase() ?? "") : "";
}

function getImageError(file: File | null) {
  if (!file) {
    return null;
  }

  const fileExtension = getFileExtension(file.name);

  if (!fileExtension || !ACCEPTED_IMAGE_TYPES.includes(fileExtension)) {
    return "Formato no soportado. Usar JPG, JPEG o PNG.";
  }

  const fileSizeInMb = file.size / 1024 / 1024;

  if (fileSizeInMb > IMAGE_MAX_SIZE_MB) {
    return `La imagen supera el máximo de ${IMAGE_MAX_SIZE_MB} MB.`;
  }

  return null;
}

function clearFieldError(
  previousErrors: ProductFormErrors,
  field: keyof ProductFormErrors,
) {
  if (!previousErrors[field]) {
    return previousErrors;
  }

  const nextErrors = { ...previousErrors };
  delete nextErrors[field];

  return nextErrors;
}

const NewProduct = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");
  const mode: ProductFormMode = productId ? "edit" : "create";
  const [form, setForm] = useState<ProductFormState>(() =>
    createEmptyProductFormState(),
  );
  const [initialForm, setInitialForm] = useState<ProductFormState>(() =>
    createEmptyProductFormState(),
  );
  const [errors, setErrors] = useState<ProductFormErrors>({});
  const [image, setImage] = useState<File | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [fileInputKey, setFileInputKey] = useState(0);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isDirty = useMemo(() => {
    if (!hasInitialized) {
      return false;
    }

    return (
      getProductFormDirtySnapshot(form, {
        imageSelected: mode === "create" && Boolean(image),
      }) !== getProductFormDirtySnapshot(initialForm)
    );
  }, [form, hasInitialized, image, initialForm, mode]);

  const shouldWarnBeforeLeaving = hasInitialized && isDirty && !isSubmitting;

  const updateFormField = <K extends keyof ProductFormState>(
    field: K,
    value: ProductFormState[K],
  ) => {
    setForm((previousForm) => ({
      ...previousForm,
      [field]: value,
    }));
  };

  const resetImage = useCallback(() => {
    setImage(null);
    setImageError(null);
    setFileInputKey((previousKey) => previousKey + 1);
  }, []);

  const confirmDiscard = () => {
    if (!shouldWarnBeforeLeaving) {
      return true;
    }

    return window.confirm(UNSAVED_CHANGES_MESSAGE);
  };

  const handleTextInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const field = event.target.name as ProductFormTextField;
    const nextValue = sanitizeProductFormTextInput(field, event.target.value);

    updateFormField(field, nextValue);
    setErrors((previousErrors) => clearFieldError(previousErrors, field));
  };

  const handleTextInputBlur = (field: ProductFormTextField) => {
    setForm((previousForm) => ({
      ...previousForm,
      [field]: normalizeProductFormField(field, previousForm[field]),
    }));
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const field = event.target.name as "disclaimerAccepted" | "exchanges";

    updateFormField(field, event.target.checked);

    if (field === "disclaimerAccepted") {
      setErrors((previousErrors) =>
        clearFieldError(previousErrors, "disclaimerAccepted"),
      );
    }
  };

  const handleImageInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextImage = event.target.files?.[0] ?? null;
    const nextImageError = getImageError(nextImage);

    if (nextImageError) {
      setImage(null);
      setImageError(nextImageError);
      setErrors((previousErrors) => clearFieldError(previousErrors, "image"));
      event.target.value = "";
      return;
    }

    setImage(nextImage);
    setImageError(null);
    setErrors((previousErrors) => clearFieldError(previousErrors, "image"));
  };

  const handleSwitchListingType: MouseEventHandler<HTMLButtonElement> = (
    event,
  ) => {
    event.preventDefault();

    setForm((previousForm) =>
      setProductFormListingType(
        previousForm,
        previousForm.listingType === constants.SALE
          ? constants.RENT
          : constants.SALE,
      ),
    );
  };

  const handleCancel = () => {
    if (!confirmDiscard()) {
      return;
    }

    setErrors({});
    setForm(initialForm);
    resetImage();
    router.push(constants.INSTRUMENTS_PATH);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedForm = normalizeProductFormState(form);
    const validationErrors = validateProductForm(normalizedForm, {
      mode,
      hasImage: Boolean(image),
      imageError,
    });

    setForm(normalizedForm);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      toast.error(INVALID_FORM_MESSAGE);
      return;
    }

    const formData = new FormData();
    formData.append("title", normalizedForm.title);
    formData.append("description", normalizedForm.description);
    formData.append("year", normalizedForm.year);
    formData.append("price", normalizedForm.price);
    formData.append("location", normalizedForm.location);
    formData.append(
      "exchanges",
      String(
        normalizedForm.listingType === constants.SALE && normalizedForm.exchanges,
      ),
    );
    formData.append("listingType", normalizedForm.listingType);

    if (mode === "create" && image) {
      formData.append("image", image);
    }

    const endpoint = productId
      ? `/api/products/edit/${productId}`
      : "/api/products/create";

    try {
      setIsSubmitting(true);
      const promise = axios.post(endpoint, formData);
      toast.promise(promise, {
        pending: "Publicando...",
        error: {
          render({
            data,
          }: {
            data?: { response?: { data?: { error?: string } } };
          }) {
            return data?.response?.data?.error ?? "Error";
          },
        },
      });
      await promise;
      setInitialForm(normalizedForm);
      if (mode === "create") {
        resetImage();
      }

      const nextRoute = productId
        ? `${constants.INSTRUMENTS_PATH}/${productId}`
        : normalizedForm.listingType === constants.RENT
          ? `${constants.INSTRUMENTS_PATH}#alquiler`
          : constants.INSTRUMENTS_PATH;

      router.push(nextRoute);
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (mode === "edit") {
      return;
    }

    const initialListingType =
      window.location.hash === "#alquiler" ? constants.RENT : constants.SALE;
    const emptyForm = createEmptyProductFormState(initialListingType);

    setForm(emptyForm);
    setInitialForm(emptyForm);
    setErrors({});
    resetImage();
    setHasInitialized(true);
  }, [mode, resetImage]);

  useEffect(() => {
    if (mode !== "edit" || !productId) {
      return;
    }

    let isActive = true;

    setHasInitialized(false);

    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/products/${productId}`);
        const product: ProductProps = response.data;
        const nextForm = normalizeProductFormState(productToFormState(product));

        if (!isActive) {
          return;
        }

        setForm(nextForm);
        setInitialForm(nextForm);
        setErrors({});
        resetImage();
      } catch (error) {
        console.error("Error fetching data:", error);
        if (isActive) {
          toast.error("No se pudo cargar la publicación.");
        }
      } finally {
        if (isActive) {
          setHasInitialized(true);
        }
      }
    };

    fetchData();

    return () => {
      isActive = false;
    };
  }, [mode, productId, resetImage]);

  useEffect(() => {
    if (!shouldWarnBeforeLeaving) {
      return;
    }

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };

    const handleDocumentClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const anchor = target.closest("a[href]");

      if (!(anchor instanceof HTMLAnchorElement)) {
        return;
      }

      if (anchor.target === "_blank" || anchor.hasAttribute("download")) {
        return;
      }

      const nextUrl = new URL(anchor.href, window.location.href);

      if (nextUrl.origin !== window.location.origin) {
        return;
      }

      const currentRoute = `${window.location.pathname}${window.location.search}`;
      const nextRoute = `${nextUrl.pathname}${nextUrl.search}`;

      if (currentRoute === nextRoute) {
        return;
      }

      if (!window.confirm(UNSAVED_CHANGES_MESSAGE)) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("click", handleDocumentClick, true);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("click", handleDocumentClick, true);
    };
  }, [shouldWarnBeforeLeaving]);

  if (mode === "edit" && !hasInitialized) {
    return (
      <FormShell
        description="Cargando la publicación para editar."
        eyebrow="Edición"
        size="wide"
        title="Editar publicación"
      >
        <div className="ui-panel p-6 text-center text-sm text-slate-600 dark:text-slate-300">
          Cargando publicación...
        </div>
      </FormShell>
    );
  }

  return (
    <FormShell
      description="Publicá un instrumento para venta o alquiler"
      eyebrow={productId ? "Edición" : "Publicación"}
      size="wide"
      title={productId ? "Editar publicación" : "Crear publicación"}
    >
      <form className="ui-form-grid" onSubmit={handleSubmit}>
        {!productId && (
          <SaleRentSwitchButton
            handleSwitchListingType={handleSwitchListingType}
            listingType={form.listingType}
          />
        )}

        <Field error={errors.title} htmlFor="title" label="Título:" required={true}>
          <input
            className="ui-input"
            id="title"
            name="title"
            onBlur={() => handleTextInputBlur("title")}
            onChange={handleTextInputChange}
            placeholder={placeholders.title}
            required={true}
            type="text"
            value={form.title}
          />
        </Field>

        <Field error={errors.description} htmlFor="description" label="Descripción:">
          <textarea
            className="ui-textarea max-h-48"
            id="description"
            name="description"
            onBlur={() => handleTextInputBlur("description")}
            onChange={handleTextInputChange}
            placeholder={placeholders.description}
            value={form.description}
          ></textarea>
        </Field>

        <Field error={errors.year} htmlFor="year" label="Año:">
          <input
            className="ui-input"
            id="year"
            inputMode="numeric"
            maxLength={PRODUCT_YEAR_MAX_LENGTH}
            name="year"
            onBlur={() => handleTextInputBlur("year")}
            onChange={handleTextInputChange}
            placeholder={placeholders.year}
            type="text"
            value={form.year}
          />
        </Field>

        <Field
          error={errors.price}
          htmlFor="price"
          label={form.listingType === constants.SALE ? "Precio:" : "Precio / día:"}
          required={true}
        >
          <input
            className="ui-input"
            id="price"
            inputMode="numeric"
            name="price"
            onBlur={() => handleTextInputBlur("price")}
            onChange={handleTextInputChange}
            placeholder={placeholders.price}
            required={true}
            type="text"
            value={form.price}
          />
        </Field>

        <Field
          error={errors.location}
          htmlFor="location"
          label="Ubicación:"
          required={true}
        >
          <input
            className="ui-input"
            id="location"
            maxLength={PRODUCT_LOCATION_MAX_LENGTH}
            name="location"
            onBlur={() => handleTextInputBlur("location")}
            onChange={handleTextInputChange}
            placeholder={placeholders.location}
            required={true}
            type="text"
            value={form.location}
          />
        </Field>

        {form.listingType === constants.SALE && (
          <Field htmlFor="exchanges" label="Canje:">
            <div className="ui-checkbox-row">
              <input
                checked={form.exchanges}
                className="ui-checkbox"
                id="exchanges"
                name="exchanges"
                onChange={handleCheckboxChange}
                type="checkbox"
              />
              <p className="text-sm leading-6 text-slate-700 dark:text-slate-200">
                {placeholders.exchanges}
              </p>
            </div>
          </Field>
        )}

        {!productId && (
          <Field
            description={IMAGE_DESCRIPTION}
            error={errors.image ?? imageError ?? undefined}
            htmlFor="image"
            label="Foto:"
            required={true}
          >
            <FileInput
              accept={IMAGE_ACCEPT}
              id="image"
              key={fileInputKey}
              name="image"
              onChange={handleImageInputChange}
              required={mode === "create"}
            />
          </Field>
        )}

        <Field
          error={errors.disclaimerAccepted}
          htmlFor="disclaimerAccepted"
          label="Confirmación:"
          required={true}
        >
          <div className="ui-checkbox-row">
            <input
              checked={form.disclaimerAccepted}
              className="ui-checkbox"
              id="disclaimerAccepted"
              name="disclaimerAccepted"
              onChange={handleCheckboxChange}
              required={true}
              type="checkbox"
            />
            <p className="text-sm leading-6 text-slate-700 dark:text-slate-200">
              {formText.disclaimerConsent}
            </p>
          </div>
        </Field>

        <div className="ui-form-actions">
          <Button disabled={isSubmitting} type="submit">
            {productId ? "Guardar cambios" : "Publicar"}
          </Button>
          <Button
            disabled={isSubmitting}
            onClick={handleCancel}
            type="button"
            variant="secondary"
          >
            Cancelar
          </Button>
        </div>
      </form>
    </FormShell>
  );
};

export default NewProduct;
