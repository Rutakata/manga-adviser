import { Dispatch } from "redux";
import { MainApi } from "../../API/api";
import { Title, MainState, Action } from "../Interfaces/MainInterfaces/mainInterfaces"


const SET_TITLES = "SET_TITLES";
const SET_LOADING = "SET_LOADING";


let initialState:MainState = {
    titles: [],
    loading: true,
}

export function mainReducer(state = initialState, action: Action<Title[]>): MainState  {
    switch(action.type) {
        case SET_TITLES:
            return { titles: action.payload ? action.payload: state.titles, loading: true }
        case SET_LOADING:
            return { titles: state.titles, loading: action.isLoading ? action.isLoading: false}
        default:
            return state
    }
}

const setLoading = (isLoading: boolean) => {
    return { type: SET_LOADING, isLoading }
}

const setTitles = (payload: Title[]) => {
    return { type: SET_TITLES, payload }
}

export const getTitles = (searchRequest: string) => async(dispatch: Dispatch) => {
    try {
        dispatch(setLoading(true))
        let response = await MainApi.getTitleByName(searchRequest);    
        response.data.data.forEach(async (title: Title) => {
            let cover: string = await MainApi.getTitleCover(title.id).then(response => response.data.data[0].attributes.fileName);
            title.cover = cover;
        });
        
        dispatch(setTitles(response.data.data));
        dispatch(setLoading(false));
    } catch(e) {
        console.error(e);
    }
}