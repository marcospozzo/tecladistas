"use client";

import { Button } from "@/components/ui/Button";
import Field from "@/components/ui/Field";
import FormShell from "@/components/ui/FormShell";
import { EditableInput, SaleRentSwitchButton } from "@/components";
import SimpleFileUploader from "@/components/SimpleFileUploader";
import { ProductProps } from "@/types";
import { constants } from "@/utils/utils";
import { imageTypes, placeholders } from "@/utils/utils";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ChangeEvent,
  ChangeEventHandler,
  FormEvent,
  MouseEvent,
  useEffect,
  useReducer,
  useState,
} from "react";
import { toast } from "react-toastify";

type DataAction =
  | { field: string; type: "UPDATE"; value: boolean | string }
  | { type: "SET_EXCHANGES_FALSE" }
  | { type: "OVERWRITE"; value: ProductProps };

const dataReducer = (state: ProductProps, action: DataAction): ProductProps => {
  switch (action.type) {
    case "UPDATE":
      return { ...state, [action.field]: action.value };
    case "SET_EXCHANGES_FALSE":
      return { ...state, exchanges: false };
    case "OVERWRITE":
      return action.value;
    default:
      return state;
  }
};

const NewProduct = () => {
  const router = useRouter();
  const [image, setImage] = useState<File | null>(null);
  const [listingType, setListingType] = useState(constants.SALE);
  const [data, dispatch] = useReducer(dataReducer, {} as ProductProps);
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");

  const handleEditableInputChange: ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    if (event.target) {
      dispatch({
        type: "UPDATE",
        field: event.target.name,
        value: event.target.value,
      });
    }
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target) {
      dispatch({
        type: "UPDATE",
        field: event.target.name,
        value: event.target.checked,
      });
    }
  };

  const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target) {
      dispatch({
        type: "UPDATE",
        field: event.target.name,
        value: event.target.value,
      });
    }
  };

  const handleImageUploaderChange = (image: File | null) => {
    setImage(image);
  };

  const handleSwitchListingType = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (listingType === constants.SALE) {
      dispatch({ type: "SET_EXCHANGES_FALSE" });
    }
    setListingType((prevListingType) =>
      prevListingType === constants.SALE ? constants.RENT : constants.SALE,
    );
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        formData.append(key, data[key]);
      }
    }

    if (!productId && image) {
      formData.append("image", image);
    }
    formData.append("listingType", listingType);

    const endpoint = productId
      ? `/api/products/edit/${productId}`
      : "/api/products/create";

    try {
      const promise = axios.post(endpoint, formData);
      toast.promise(promise, {
        pending: "Publicando...",
        error: {
          render({
            data,
          }: {
            data?: { response?: { data?: { error?: string } } };
          }) {
            console.error("Error response:", data);
            return data?.response?.data?.error ?? "Error";
          },
        },
      });
      await promise;
      const route = productId
        ? `${constants.INSTRUMENTS_PATH}/${productId}`
        : listingType === constants.RENT
          ? `${constants.INSTRUMENTS_PATH}#alquiler`
          : constants.INSTRUMENTS_PATH;
      router.push(route);
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const syncListingTypeWithHash = () => {
      setListingType(
        window.location.hash === "#alquiler"
          ? constants.RENT
          : constants.SALE,
      );
    };

    syncListingTypeWithHash();
    window.addEventListener("hashchange", syncListingTypeWithHash);

    return () => {
      window.removeEventListener("hashchange", syncListingTypeWithHash);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (productId) {
        try {
          const data = await axios.get(`/api/products/${productId}`);
          const product: ProductProps = data.data;

          // Omitting the listingType property from the product object

          // Filter out null or undefined properties
          const cleanedProduct = Object.fromEntries(
            Object.entries(product).filter(
              ([key, value]) =>
                key !== "listingType" &&
                value !== null &&
                value !== undefined,
            ),
          ) as ProductProps;

          dispatch({
            type: "OVERWRITE",
            value: cleanedProduct,
          });
          setListingType(product.listingType!);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [productId]);

  return (
    <FormShell
      description="Publicá un instrumento para venta o alquiler dentro de la comunidad."
      eyebrow={productId ? "Edición" : "Publicación"}
      size="wide"
      title={productId ? "Editar publicación" : "Crear publicación"}
    >
      <form className="ui-form-grid" onSubmit={handleSubmit}>
        {!productId && (
          <SaleRentSwitchButton
            handleSwitchListingType={handleSwitchListingType}
            listingType={listingType}
          />
        )}
        <EditableInput
          handleOnChange={handleEditableInputChange}
          label="Título"
          fieldName="title"
          text={data.title}
        />

        <Field htmlFor="description" label="Descripción:">
          <textarea
            className="ui-textarea max-h-48"
            id="description"
            name="description"
            onChange={handleTextAreaChange}
            placeholder={placeholders.description}
            value={data.description || ""}
          ></textarea>
        </Field>

        <EditableInput
          handleOnChange={handleEditableInputChange}
          label="Año"
          fieldName="year"
          text={data.year}
        />
        <EditableInput
          handleOnChange={handleEditableInputChange}
          label={listingType === constants.SALE ? "Precio" : "Precio / día"}
          fieldName="price"
          text={data.price}
        />

        <EditableInput
          handleOnChange={handleEditableInputChange}
          label="Ubicación"
          fieldName="location"
          text={data.location}
        />

        {listingType === constants.SALE && (
          <Field htmlFor="exchanges" label="Canje:">
            <div className="ui-checkbox-row">
              <input
                checked={data.exchanges || false}
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
          <Field htmlFor="image" label="Foto:">
            <SimpleFileUploader
              classes="self-center space-x-4 w-full h-12"
              handleChange={handleImageUploaderChange}
              id="image"
              label={placeholders.image}
              maxSize={20}
              name="image"
              required={!productId}
              types={imageTypes}
            />
          </Field>
        )}

        <Field htmlFor="disclaimer" label="Confirmación:">
          <div className="ui-checkbox-row">
            <input
              className="ui-checkbox"
              id="disclaimer"
              name="disclaimer"
              onChange={handleCheckboxChange}
              required={true}
              type="checkbox"
            />
            <p className="text-sm leading-6 text-slate-700 dark:text-slate-200">
              {placeholders.disclamer}
            </p>
          </div>
        </Field>

        <div className="ui-form-actions">
          <Button type="submit">
            {productId ? "Guardar cambios" : "Publicar"}
          </Button>
        </div>
      </form>
    </FormShell>
  );
};

export default NewProduct;
