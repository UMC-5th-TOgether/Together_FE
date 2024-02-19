import React, { useRef, useEffect } from 'react';
import Tagify from '@yaireo/tagify';

import '@yaireo/tagify/dist/tagify.css';
import '../style/HashTag.css';

export const HashTag = ({ initHashtags, onHashTagsChange }) => {
    const inputRef = useRef(null);
    let tagifyInstance = null;
    console.log(initHashtags);

    useEffect(() => {
        tagifyInstance = new Tagify(inputRef.current, {
            maxTags: 3,
        });
        
        if (initHashtags) {
            tagifyInstance.addTags(initHashtags);
        }

        tagifyInstance.on('add', onTagAdded);

        return () => {
            tagifyInstance.destroy();
        };
    }, []);

    const onTagAdded = () => {
        console.log(tagifyInstance.value);
        if (onHashTagsChange) {
            onHashTagsChange(tagifyInstance.value.map(tag => tag.value));
        }
    };

    return (
        <div>
            <input
                ref={inputRef}
                placeholder="최대 3개의 해시태그를 입력할 수 있습니다."
            />
        </div>
    );
};