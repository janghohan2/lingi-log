# Mybatis에서 1:n 관계 테이블 JOIN 하기
Album
id|album|singer
-|-|-
1|Love poem|아이유

Singer
id|album_id|song
-|-|-
1|1|unlucky
2|1|그 사람
3|1|Blueming
4|1|시간의 바깥
5|1|자장가
6|1|Love poem

두 테이블이 있고 여기서 album과 가수, 곡정보를 한꺼번에 가져오고 싶으면 join을 사용하면 된다. 조인을 사용해 가져오면 아래와 같은 형태로 가져오게 되는데,

album_id|album|가수|song_id|song
-|-|-|-|-
1|Love poem|아이유|1|unlucky
1|Love poem|아이유|2|그 사람
1|Love poem|아이유|3|Blueming
1|Love poem|아이유|4|시간의 바깥
1|Love poem|아이유|5|자장가
1|Love poem|아이유|6|Love poem

album과 가수 정보가 중복으로 들어가게 된다. Album과 Singer는 1:n 관계로, Album에 해당하는 정보는 한개만 있어도 되기 때문에 



### 쿼리 관련
```xml
<resultMap id="resultAlbum" type="com.example.demo.api.album.domain.Album">
    <id property="id" column="albumId"/>
    <result property="title" column="albumTitle"/>
    <collection property="songs" column="albumId" javaType="ArrayList" ofType="com.example.demo.api.album.domain.Song">
        <id property="id" column="songId"/>
        <result property="title" column="songTitle"/>
        <result property="track" column="track"/>
        <result property="length" column="length"/>
    </collection>
</resultMap>
```
