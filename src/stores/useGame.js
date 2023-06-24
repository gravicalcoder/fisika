import { create } from 'zustand'


export default create(() =>
{
    return {
        blocksCount: 3,

        /**
         * Phases
         */
        phase: 'ready',

        start: () =>
        {
            set(() =>
            {
                return { phase: 'playing' }
            })
        },

        restart: () =>
        {
            set(() =>
            {
                return { phase: 'ready' }
            })
        },

        end: () =>
        {
            set(() =>
            {
                return { phase: 'ended' }
            })
        },

        movement: 'run',

        walk: () =>
        {
            set(() =>
            {
                return { movement: 'walk' }
            })
        },

        sprint: () =>
        {
            set(() =>
            {
                return { movement: 'sprint' }
            })
        }
    }
})