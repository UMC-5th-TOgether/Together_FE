import React, { useEffect, useRef } from 'react';
import Tagify from '@yaireo/tagify';

import '@yaireo/tagify/dist/tagify.css';
import '../style/HashTag.css';

export const HashTag = () => {
    const inputRef = useRef(null);
    let tagifyInstance = null;

    useEffect(() => {
        tagifyInstance = new Tagify(inputRef.current, {
            maxTags: 3,
        });

        tagifyInstance.on('add', onTagAdded);

        return () => {
            tagifyInstance.destroy();
        };
    }, []);

    const onTagAdded = () => {
        console.log(tagifyInstance.value);
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
