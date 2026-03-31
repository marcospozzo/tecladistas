import { ProductProps } from "@/types";
import { constants } from "./utils";

export type ProductFormMode = "create" | "edit";

export type ProductFormState = {
  title: string;
  description: string;
  year: string;
  price: string;
  location: string;
  exchanges: boolean;
  listingType: typeof constants.SALE | typeof constants.RENT;
  disclaimerAccepted: boolean;
};

export type ProductFormTextField =
  | "title"
  | "description"
  | "year"
  | "price"
  | "location";

export type ProductFormErrors = Partial<
  Record<ProductFormTextField | "disclaimerAccepted" | "image", string>
>;

export const PRODUCT_LOCATION_MAX_LENGTH = 20;
export const PRODUCT_YEAR_MAX_LENGTH = 4;

function collapseWhitespace(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

function capitalizeToken(value: string) {
  if (!value) {
    return value;
  }

  return (
    value.charAt(0).toLocaleUpperCase("es-AR") +
    value.slice(1).toLocaleLowerCase("es-AR")
  );
}

function toCapitalizedWords(value: string) {
  return collapseWhitespace(value)
    .split(" ")
    .filter(Boolean)
    .map((word) =>
      word
        .split("-")
        .map((token) => capitalizeToken(token))
        .join("-"),
    )
    .join(" ");
}

function normalizeDescription(value: string) {
  return value
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((line) => line.trim().replace(/[ \t]+/g, " "))
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function normalizeDigits(value: string, maxLength?: number) {
  const digits = value.replace(/\D/g, "");

  return maxLength ? digits.slice(0, maxLength) : digits;
}

export function createEmptyProductFormState(
  listingType: ProductFormState["listingType"] = constants.SALE,
): ProductFormState {
  return {
    title: "",
    description: "",
    year: "",
    price: "",
    location: "",
    exchanges: false,
    listingType,
    disclaimerAccepted: false,
  };
}

export function productToFormState(product: ProductProps): ProductFormState {
  const listingType = product.listingType ?? constants.SALE;

  return {
    title: product.title ? String(product.title) : "",
    description: product.description ? String(product.description) : "",
    year: product.year ? String(product.year) : "",
    price: product.price ? String(product.price) : "",
    location: product.location ? String(product.location) : "",
    exchanges: Boolean(product.exchanges),
    listingType,
    disclaimerAccepted: false,
  };
}

export function sanitizeProductFormTextInput(
  field: ProductFormTextField,
  value: string,
) {
  switch (field) {
    case "price":
      return normalizeDigits(value);
    case "year":
      return normalizeDigits(value, PRODUCT_YEAR_MAX_LENGTH);
    case "location":
      return value.slice(0, PRODUCT_LOCATION_MAX_LENGTH);
    default:
      return value;
  }
}

export function normalizeProductFormField(
  field: ProductFormTextField,
  value: string,
) {
  switch (field) {
    case "title":
      return toCapitalizedWords(value);
    case "location":
      return value;
    case "description":
      return normalizeDescription(value);
    case "price":
      return normalizeDigits(value);
    case "year":
      return normalizeDigits(value, PRODUCT_YEAR_MAX_LENGTH);
    default:
      return value;
  }
}

export function normalizeProductFormState(
  state: ProductFormState,
): ProductFormState {
  const normalizedState: ProductFormState = {
    ...state,
    title: normalizeProductFormField("title", state.title),
    description: normalizeProductFormField("description", state.description),
    year: normalizeProductFormField("year", state.year),
    price: normalizeProductFormField("price", state.price),
    location: normalizeProductFormField("location", state.location),
  };

  if (normalizedState.listingType === constants.RENT) {
    normalizedState.exchanges = false;
  }

  return normalizedState;
}

export function setProductFormListingType(
  state: ProductFormState,
  listingType: ProductFormState["listingType"],
) {
  return normalizeProductFormState({
    ...state,
    listingType,
  });
}

export function getProductFormDirtySnapshot(
  state: ProductFormState,
  options?: { imageSelected?: boolean },
) {
  return JSON.stringify({
    ...normalizeProductFormState(state),
    imageSelected: Boolean(options?.imageSelected),
  });
}

export function validateProductForm(
  state: ProductFormState,
  options: {
    hasImage: boolean;
    imageError?: string | null;
    mode: ProductFormMode;
  },
): ProductFormErrors {
  const errors: ProductFormErrors = {};
  const normalizedState = normalizeProductFormState(state);
  const trimmedLocation = normalizedState.location.trim();
  const currentYear = new Date().getFullYear() + 1;

  if (!normalizedState.title) {
    errors.title = "Ingresá un título.";
  }

  if (!normalizedState.price) {
    errors.price = "Ingresá un precio.";
  } else if (Number(normalizedState.price) <= 0) {
    errors.price = "Ingresá un precio mayor a cero.";
  }

  if (!trimmedLocation) {
    errors.location = "Ingresá una ubicación.";
  } else if (normalizedState.location.length > PRODUCT_LOCATION_MAX_LENGTH) {
    errors.location = `La ubicación no puede superar los ${PRODUCT_LOCATION_MAX_LENGTH} caracteres.`;
  }

  if (normalizedState.year) {
    const yearAsNumber = Number(normalizedState.year);

    if (normalizedState.year.length !== PRODUCT_YEAR_MAX_LENGTH) {
      errors.year = "Ingresá un año de cuatro dígitos.";
    } else if (yearAsNumber < 1900 || yearAsNumber > currentYear) {
      errors.year = `Ingresá un año entre 1900 y ${currentYear}.`;
    }
  }

  if (!normalizedState.disclaimerAccepted) {
    errors.disclaimerAccepted = "Necesitás aceptar la confirmación.";
  }

  if (options.imageError) {
    errors.image = options.imageError;
  } else if (options.mode === "create" && !options.hasImage) {
    errors.image = "Elegí una foto.";
  }

  return errors;
}
