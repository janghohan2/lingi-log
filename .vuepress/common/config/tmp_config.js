module.exports = {
    title: "Lingi-log",
    description: "Blog About Study",
    base: "/",
    // theme: "@vuepress/vue",
    themeConfig: {
        logo: "/thumbnail.png",
        footer: "jh",
        nav: [
            { "text": "블로그 개발기", "link": "/blog/", "position": "left", "external": false },
            { "text": "Posts", "link": "/posts/", "position": "left", "external": false },
            { "text": "Algorithm", "link": "/algorithm/", "position": "left", "external": false },
            { "text": "Linux", "link": "/linux/", "position": "left", "external": false },
            { "text": "DB", "link": "/db/", "position": "left", "external": false },
            { "text": "About", "link": "/about", "position": "right", "external": false }
        ],
        lastUpdated: 'Last Updated',
        // algolia: {
        //     apiKey: '7055df7452cbcc1e86f33eb175f3d949',
        //     appId: '376LIH16NX',
        //     indexName: 'getstarted_actors',
        //     algoliaOptions: {
        //         hitsPerPage: 10,
        //     }
        // },
        sidebar: {
            '/posts/': [{
                title: 'Others',
                collapsable: false,
                children: [
                    //_others
                ]
            }],
            '/linux/': [{
                title: 'Linux 운영',
                collapsable: false,
                children: [
                    //_linux운영
                ]
            }],
            '/algorithm/': [{
                title: 'Algorithm',
                collapsable: false,
                children: [
                    //_algorithm
                ]
            }],
            '/db/': [{
                title: 'DB',
                collapsable: false,
                children: [
                    //_db
                ]
            }],
            '/blog/': [{
                title: '블로그 개발기',
                collapsable: true,
                children: [
                    //_blog
                ]
            }, {
                title: '책 관리 시스템',
                collapsable: false,
                children: [
                    //_book
                ]
            }, {
                title: '서버 관리 시스템',
                collapsable: true,
                children: []
            }],
            // fallback
            '/': []
        }
    },
    head: [
        // ['link', { rel: "icon", href:  }]
    ],
    markdown: {
        anchor: {
            permalink: false
        }
    },

};