import { Grid, GridProps } from "@mui/material"

export const Row: React.FC<GridProps> = (props) => {
    return (
        <Grid
            spacing={2}
            {...props}
            container
        />
    )
}
