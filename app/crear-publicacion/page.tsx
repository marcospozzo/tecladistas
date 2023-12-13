"use client";

import { EditableInput, SaleRentSwitchButton } from "@/components";
import { ProductProps } from "@/types";
import { RENT, SALE } from "@/utils/constants";
import { imageTypes, placeholders } from "@/utils/utils";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ChangeEvent,
  ChangeEventHandler,
  FormEvent,
  SetStateAction,
  useState,
  useReducer,
  useEffect,
} from "react";
import { FileUploader } from "react-drag-drop-files";
import { toast } from "react-toastify";

const dataReducer = (state: ProductProps, action: any): ProductProps => {
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
  const [image, setImage] = useState(null);
  const [listingType, setListingType] = useState(SALE);
  const [data, dispatch] = useReducer(dataReducer, {});
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");

  const handleEditableInputChange: ChangeEventHandler<HTMLInputElement> = (
    event
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

  const handleImageUploaderChange = (image: SetStateAction<null>) => {
    setImage(image);
  };

  const handleSwitchListingType = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (listingType === SALE) {
      dispatch({ type: "SET_EXCHANGES_FALSE" });
    }
    setListingType((prevListingType) =>
      prevListingType === SALE ? RENT : SALE
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

    !productId && formData.append("image", image!);
    formData.append("listingType", listingType);

    const endpoint = productId
      ? `/api/products/edit/${productId}`
      : "/api/products/create";

    try {
      const promise = axios.post(endpoint, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
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
      const route = productId
        ? `/instrumentos/${productId}`
        : listingType === RENT
        ? "/instrumentos#alquiler"
        : "/instrumentos";
      router.push(route);
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (window.location.hash === "#alquiler") setListingType(RENT);
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
              ([_, value]) => value !== null && value !== undefined
            )
          );

          const { listingType, ...cleanedProductWithoutListingType } =
            cleanedProduct;

          dispatch({
            type: "OVERWRITE",
            value: cleanedProductWithoutListingType,
          });
          setListingType(product.listingType!);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1 className="form-title">
        {productId ? "Editar publicación" : "Crear publicación"}
      </h1>

      <form className="wide-form" onSubmit={handleSubmit}>
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

        <div className="flex max-sm:flex-col max-sm:w-full">
          <label
            htmlFor={"description"}
            className="self-center max-sm:self-start w-1/5"
          >
            {"Descripción:"}
          </label>

          <textarea
            className="h-24 min-h-[6rem] max-h-48 sm:w-4/5"
            id="description"
            name="description"
            placeholder={placeholders.description}
            onChange={handleTextAreaChange}
            value={data.description || ""} // Ensure that value is set
          ></textarea>
        </div>

        <EditableInput
          handleOnChange={handleEditableInputChange}
          label="Año"
          fieldName="year"
          text={data.year}
        />
        <EditableInput
          handleOnChange={handleEditableInputChange}
          label={listingType === SALE ? "Precio" : "Precio / día"}
          fieldName="price"
          text={data.price}
        />

        <EditableInput
          handleOnChange={handleEditableInputChange}
          label="Ubicación"
          fieldName="location"
          text={data.location}
        />

        {listingType === SALE && (
          <div className="flex max-sm:flex-col space-x-2 my-4">
            <label
              className="w-1/5 self-center max-sm:self-start "
              htmlFor="exchanges"
            >
              Intercambio:
            </label>
            <div className="flex space-x-2">
              <input
                className="h-5 w-5 m-0 self-center"
                type="checkbox"
                id="exchanges"
                name="exchanges"
                onChange={handleCheckboxChange}
                checked={data.exchanges || false} // Ensure that checked property is set
              />
              <h3 className="self-center">{placeholders.exchanges}</h3>
            </div>
          </div>
        )}
        {!productId && (
          <div className="flex max-sm:flex-col my-4">
            <label
              className="w-1/5 self-center max-sm:self-start "
              htmlFor="image"
            >
              Foto:
            </label>
            <FileUploader
              maxSize={5}
              required={productId ? false : true}
              label={placeholders.image}
              hoverTitle=""
              classes="self-center space-x-4 w-full h-12"
              handleChange={handleImageUploaderChange}
              name="image"
              id="image"
              types={imageTypes}
            />
          </div>
        )}

        <div className="flex max-sm:flex-col space-x-2 my-4 justify-center">
          <div className="flex space-x-2">
            <input
              className="h-5 w-5 m-0 self-center"
              type="checkbox"
              id="disclaimer"
              name="disclaimer"
              onChange={handleCheckboxChange}
              required={true}
            />
            <h3 className="self-center">{placeholders.disclamer}</h3>
          </div>
        </div>

        <button className="submit-button my-6" type="submit">
          <h3>{productId ? "Guardar cambios" : "Publicar"}</h3>
        </button>
      </form>
    </>
  );
};

export default NewProduct;
