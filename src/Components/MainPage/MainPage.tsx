import { Grid, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { Dispatch, SetStateAction } from "react";
import MainPageItemContainer from "./MainPageItem/MainPageItemContainer";
import { TitleData } from "../Common/TitlePage/Title";
import { Tag } from "../../Store/Interfaces/MainInterfaces/mainInterfaces";
import FilterListIcon from '@mui/icons-material/FilterList';
import Filter from "./Filter/Filter";


interface Props {
    titles: TitleData[];
    handleSearch: (search: string) => void;
    setChosenTags: Dispatch<SetStateAction<string[]>>;
    searchValue: string;
    loading: boolean;
    tags: Tag[];
    isOpen: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

const MainPage = (props:Props) => {
    return (
        <Container sx={{minHeight: "800px", marginBottom: "30px"}}>
            <Filter tags={props.tags} setChosenTags={props.setChosenTags} isOpen={props.isOpen} setOpen={props.setOpen} />

            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Typography variant="h4" component="h4" sx={{textAlign: "center"}}>
                        Find what you will love
                    </Typography>
                </Grid>

                <Grid item xs={11}>
                    <TextField label="Search..." variant="outlined" type="search" fullWidth value={props.searchValue}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                        props.handleSearch(e.target.value);
                    }}/>
                </Grid>
                <Grid item xs={1}>
                    <FilterListIcon fontSize="large" color="primary" onClick={() => props.setOpen(!props.isOpen)}/>
                </Grid>

                {props.titles.length === 0 ? 
                    <Grid item xs={12}>
                        <Typography variant="h5" component="h5" sx={{textAlign: "center"}}>
                            You haven't searched anything yet
                        </Typography>
                    </Grid>:
                props.loading ? 
                    <Grid item xs={12}>
                        <Typography variant="h4" component="h4" sx={{textAlign: "center"}}>
                            Loading...
                        </Typography>
                    </Grid>:
                props.titles.map(title => (
                    <MainPageItemContainer key={title.id} titleData={title} />
                ))}
            </Grid>
        </Container>
    )
}

export default MainPage;