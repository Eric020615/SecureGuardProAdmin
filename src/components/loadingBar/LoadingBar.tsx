import NextTopLoader from 'nextjs-toploader'
import React from 'react'

const TopLoader = () => {
    return (
        <>
            <NextTopLoader
                color="#29D" // Customize the loader color
                initialPosition={0.08} // Customize initial position
                crawlSpeed={200} // Speed at which the loader moves
                height={3} // Height of the loading bar
                showSpinner={false} // Set to true to show a spinner
                easing="ease"
                speed={500}
            />
        </>
    )
}

export default TopLoader
