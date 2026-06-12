export const postTypeOptions = [
    {
        value: 'FEED',
        label: 'Feed'
    },
    {
        value: 'ANNOUNCEMENT',
        label: 'Pengumuman',
        permission: 'post:create:announcement'
    },
    {
        value: 'EVENT',
        label: 'Acara'
    },
    {
        value: 'DISCUSSION',
        label: 'Diskusi'
    },
    {
        value: 'NEWS',
        label: 'Berita'
    },
]

export const postStatusOptions = [
    {
        value: 'PUBLISHED',
        label: 'Publikasikan'
    },
    {
        value: 'DRAFT',
        label: 'Draf'
    },
]