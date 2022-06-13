import { useState } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

function LightboxPopup(props) {
    const [imgIndex, setState] = useState(props.imgIndex);

    return (
        <Lightbox
            mainSrc={props.images[imgIndex]}
            nextSrc={props.images[(imgIndex + 1) % props.images.length]}
            prevSrc={props.images[(imgIndex + props.images.length - 1) % props.images.length]}
            onCloseRequest={props.close}
            onMovePrevRequest={() => setState((imgIndex + props.images.length - 1) % props.images.length)}
            onMoveNextRequest={() => setState((imgIndex + 1) % props.images.length)}
        />
    );
}

export default LightboxPopup;