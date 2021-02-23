import { writable } from 'svelte/store';


const picStore = writable([]);


const picStoreActions = {
    subscribe: picStore.subscribe,
    draw: (coords) => {
      picStore.update(pic => {
        let newPic = [...pic,{...coords}];
        return newPic;
      });
    },
    erase: (coords) => {
      picStore.update(pic => {
        //
        let filteredCoords = pic.filter(itm => !isInsideCircle(coords.x,coords.y,10,itm));
        console.log('ERASE ACTION ', filteredCoords, pic);
        //console.log("IS CIRCLE", isInsideCircle(coords.x+5,coords.y+2,10,coords));
        return filteredCoords;
      });
    }
};


const isInsideCircle = (circle_x,circle_y,rad,coords) =>
{
    let x = coords.x;
    let y = coords.y;

    if ((x - circle_x) * (x - circle_x) +
        (y - circle_y) * (y - circle_y) <= rad * rad)
        return true;
    else
        return false;
}

export {picStoreActions};
