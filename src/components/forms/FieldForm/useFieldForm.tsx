import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { format } from "date-fns";

import { MAP } from "../../../constants";
import { UserContext } from "../../../contexts";
import {
  Place,
  PlaceInput,
  useUpsertFieldMutation,
} from "../../../generated/apolloComponents";
import { LatLng } from "../../UI/MarkerMap";

import { FieldQuery } from "../../../graphql/field/queries/field";

export type FieldFormMode = "create" | "edit";

export interface UseFieldFormProps {
  mode?: FieldFormMode;
  existingData?: Place;
}

export const useFieldForm = ({ existingData: ed }: UseFieldFormProps) => {
  const history = useHistory();

  const { handleSubmit, register, watch } = useForm({
    defaultValues: {
      ...ed,
      fromTime: ed?.fromTime
        ? format(new Date(ed.fromTime), "yyyy-MM-dd'T'hh:mm")
        : "",
      toTime: ed?.toTime
        ? format(new Date(ed.toTime), "yyyy-MM-dd'T'hh:mm")
        : "",
    },
  });

  const { me } = useContext(UserContext);
  const [upsertField] = useUpsertFieldMutation();
  const [pos, setPos] = useState<LatLng>(
    ed?.point?.location
      ? {
          lat: ed.point.location.coordinates[0],
          lng: ed.point.location.coordinates[1],
        }
      : MAP.DEFAULT_POS
  );
  const [images, setImages] = useState();

  const onSubmit = async (data: PlaceInput) => {
    try {
      const { lat, lng } = pos;

      const input = {
        ...data,
        price:
          data.price && typeof data.price == "string"
            ? parseFloat(data.price)
            : 0,
        userId: me!.id,
        location: [lat, lng],
      };
      if (images) input.filesToAdd = images;

      const res = await upsertField({
        variables: { input, id: ed?.id },
        refetchQueries: ed?.id
          ? [{ query: FieldQuery, variables: { id: ed.id } }]
          : [],
      });
      const resId = res.data?.upsertPlace?.id;

      if (resId) {
        history.push(`/field/${resId}`);
      }
    } catch (err) {}
  };

  return {
    register,
    onSubmit: handleSubmit<PlaceInput>(onSubmit),
    pos,
    setPos,
    setImages,
    watch,
  };
};