export const type = 'complex-media';

/**
 * Deserializes 'complex-media' node
 * @param node
 * @returns node's representation for editor
 */
export function deserialize(node) {
    const url = 'https://images.pexels.com/photos/56005/fiji-beach-sand-palm-trees-56005.jpeg';

    return {
        data: {...node, url},
        isVoid: true,
        nodes: [],
        object: 'block',
        type
    };
}

/**
 * Serializes 'complex-media' node with specified type
 *
 * @param node
 * @param carsType
 * @returns {{"@type": *, children: *}}
 */
export function serialize(node, carsType) {
    return {
        ...node.data,
        '@type': carsType
    }
}


const getStubIconForMediaType = (mediaType) => {
    if (mediaType === 'audio') {
        return <span className="media-icon icon icon-volume-up"/>;
    }

    if (mediaType === 'image') {
        return <span className="media-icon icon icon-image"/>;
    }

    if (mediaType === 'video') {
        return <span className="media-icon icon icon-video"/>;
    }
};

export function getMediaElement(mediaType, cgiRef, url) {
    const thumb = url && mediaType === 'image' && <img className="media-asset-thumbnail" src={url}/>;
    const stub = getStubIconForMediaType(mediaType);

    if (stub) {
        return (
            <div key={cgiRef}>
                {thumb || stub}
                <span className="icon icon-lock"/>
            </div>
        );
    }

    return '<<media>>';
}

export function render(props) {
    const {attributes, children, node} = props;

    return getMediaElement(node.data.get('media').mediaType, node.data.get('media').cgiRef, node.data.get('url'));
}
