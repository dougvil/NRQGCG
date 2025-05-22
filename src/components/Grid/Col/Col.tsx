import { Grid, GridProps } from "@mui/material"

export const Col: React.FC<GridProps> = (props) => {
    return (
        <Grid
            component={"div"}
            {...props}
        />
    )
}
