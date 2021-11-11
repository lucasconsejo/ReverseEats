import { DateTime } from 'luxon';
import "intl";
import "intl/locale-data/jsonp/fr";
import { capitalizeFirstLetter } from '../utils/utils';

const currentDate = DateTime.now().setLocale("fr");

export const initState = {
    date: currentDate,
    dateFormat: capitalizeFirstLetter(currentDate.toFormat("ccc DDD à HH:mm")),
};

export const dateReducer = (state: any, action: any) => {
    switch (action.type) {
    case "CURRENT_DATE": 
        const now = DateTime.now().setLocale("fr");
        return {
            date: now,
            dateFormat: capitalizeFirstLetter(now.toFormat("ccc DDD à HH:mm")),
        }
    case "UPDATE_DATE":
        return {
            date: action.payload.date,
            dateFormat: capitalizeFirstLetter(action.payload.dateFormat)
        }
    default:
        return initState;
    }
}
