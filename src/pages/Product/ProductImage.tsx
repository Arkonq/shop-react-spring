import { useGetProductImageQuery } from "../../app/store/api/MainApi.ts";
import { Box, CardMedia } from "@mui/material";

export const ProductImage = ({
  productId,
  multiple = false,
}: {
  productId: number;
  multiple?: boolean;
}) => {
  const { data: imageData } = useGetProductImageQuery(Number(productId)!, {
    skip: !productId,
  });

  if (!imageData) return <></>;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
      }}
    >
      {multiple ? (
        imageData?.map((image) => (
          <CardMedia
            key={image}
            component="img"
            src={`data:image/png;base64, ${image}`}
            sx={{ width: "100px", height: "100px" }}
          />
        ))
      ) : (
        <CardMedia
          component="img"
          src={
            imageData.length > 0
              ? `data:image/png;base64, ${imageData[0]}`
              : "/src/shared/assets/no-image.jpg"
          }
          sx={{ width: "100px", height: "100px" }}
        />
      )}
    </Box>
  );
};
