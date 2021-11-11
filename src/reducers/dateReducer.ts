import { DateTime } from 'luxon';
import "intl";
import "intl/locale-data/jsonp/fr";

const currentDate = DateTime.now().setLocale("fr");

export const initState = {
    date: currentDate,
    dateFormat: currentDate.toFormat("ccc DDD à HH:mm"),
};

export const dateReducer = (state: any, action: any) => {
    switch (action.type) {
    case "UPDATE_DATE":
        return {
            date: action.payload.date,
            dateFormat: action.payload.dateFormat
        }
    default:
        return initState;
    }
}
