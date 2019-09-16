module.exports = {
    title: "Lingi-log",
    description: "Blog About Study",
    base: "/",
    // theme: "@vuepress/vue",
    themeConfig: {
        logo: "/thumbnail.png",
        footer: "jh",
        nav: [
            { "text": "Study", "link": "/study/", "position": "left", "external": false },
            { "text": "Backend", "link": "/backend/", "position": "left", "external": false },
            { "text": "Frontend", "link": "/frontend/", "position": "left", "external": false },
            { "text": "Linux", "link": "/linux/", "position": "left", "external": false },
            { "text": "DB", "link": "/db/", "position": "left", "external": false },
            { "text": "Algorithm", "link": "/algorithm/", "position": "left", "external": false },
            { "text": "About", "link": "/about", "position": "right", "external": false }
        ],
        lastUpdated: 'Last Updated',
        sidebar: {
            '/backend/': [{
                title: 'Spring Boot',
                collapsable: false,
                children: [
                    'springboot-annotation',
                    'springboot-jpa',
                    {
                        title: 'Spring Security',
                        collapsable: true,
                        children: [
                            'springboot-security',
                            'springboot-security_2_config',
                            'springboot-security_3_인증방식',
                            'springboot-security_4_filter',
                            'springboot-security_5_provider',
                            'springboot-security_6_entrypoint',
                            'springboot-security_7_exceptions'
                        ]
                    }

                ]
            }, {
                title: 'Elastic Search',
                collapsable: false,
                children: [
                    'es_1_세팅',
                    'es_2_매핑',
                    'es_4_DB와 비교',
                    'es_5_성능최적화',
                    'es_6_alias'

                ]
            }],
            '/frontend/': [{
                title: 'Angular',
                collapsable: false,
                children: [
                    //_others
                ]
            }, {
                title: 'Vue',
                collapsable: false,
                children: [
                    //_others
                ]
            }],
            '/linux/': [{
                title: 'Linux 운영',
                collapsable: false,
                children: [
                    '1_자주_쓰는_명령어',
                    '2_nohup',
                    '3_kill_과_trap',
                    '4_so_파일_만들기',
                    '5_install_gcc_without_internet_connection',
                    //_linux운영
                ]
            }],
            '/db/': [{
                title: 'DB',
                collapsable: false,
                children: [
                    //_db
                ]
            }],
            '/algorithm/': [{
                title: 'Algorithm',
                collapsable: false,
                children: [{
                        title: 'Leet Code',
                        collapsable: true,
                        children: [
                            'algorithm_leet_46-50',
                            'algorithm_leet_51-60'
                        ]
                    }

                    //_algorithm
                ]
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