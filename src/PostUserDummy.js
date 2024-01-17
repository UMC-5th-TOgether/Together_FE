export const dummy = {
    results: [
        {
            id:1,
            title:"뉴진스 팬미팅 동행 구합니다",
            author: 
                {
                memberId: 3,
                nickname:"귀여운 흑등고래",
                authorGender:"여성",
                age:23
                }
            ,
            dateCreated:"2023.11.20  10:02",
            category:"공연",
            date:"2023.12.31",
            headcount:"2명",
            gender:"제한없음",
            hashtag:["뉴진스", "팬미팅", "버니즈"],
            content:`저는 여자라서, 같은 여자 버니즈 분이셨으면 좋겠어요. 최애는 하니입니다!!
            팬미팅 가기 전에 근처 카페에서 서로 이야기를 나누고 가는 것도 좋을 것 같아요.
            부담 없이 연락 주세요!`,
            comment: [
                {
                    parentId:1,
                    id: 1,
                    memberNickname: "바니바니",
                    authorGender: "여성",
                    age: 24,
                    contents: "몇 시쯤 가세요?",
                    commentDateCreated: "2023.11.21  20:14"
                },
                {
                    parentId:1,
                    id: 2,
                    memberNickname: "soobini",
                    authorGender: "여성",
                    age: 21,
                    contents: "재밌을 것 같아요",
                    commentDateCreated: "2023.11.23  14:38"
                }
            ]
        }]}