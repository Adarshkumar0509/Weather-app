import React from 'react';

import Thunderstorm from '../assets/Thunderstorm.gif';
import Rain from '../assets/Rain.gif';
import SnowDay from '../assets/Snow.gif';
import ClearDay from '../assets/ClearDay.gif';
import ClearNight from '../assets/ClearNight.gif';
import CloudsDay from '../assets/CloudsDay.gif';
import CloudsNight from '../assets/CloudsNight.gif';
import Haze from '../assets/Haze.gif';
// import video from '../assets/video1.mp4'
const WeatherBackground = ({ condition }) => {
    const gifs = {
        Thunderstorm,
        Drizzle: Rain,
        Rain,
        Snow: SnowDay,
        Clear: { day: ClearDay, night: ClearNight },
        Clouds: { day: CloudsDay, night: CloudsNight },
        Mist: Haze,
        Smoke: Haze,
        Haze,
        Fog: Haze,
// default: video    };
    const getBackground = ()=>{
        if(!condition) return gifs.default;
        const weatherType = condition.main;
        const asset = gifs[weatherType];

        if(!asset) return gifs.default;
        if(typeof asset === 'object') return condition.isDay ? asset.day : asset.night;

        return asset;
    }
    const background = getBackground();
    return(
        <div className='fixed z-0 inset-0 overflow-hidden'>
            <img src={background} alt='Weather-bg' className='w-full h-full object-cover opacity-20 pointer-events-none animate-fade-in' />
            <div className='inset-0 absolute bg-black/30'/>
        </div>
    )
}
export default WeatherBackground;
