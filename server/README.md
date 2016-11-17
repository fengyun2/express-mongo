Usage:

```shell
npm run nodemon
```

curl方式:

post: 请求

```shell
# Query -> scehma下 GraphQLObjectType的 name
curl -XPOST -H "Content-Type:application/graphql" -d 'query Query {user(id:"1"){id,name}}' http://localhost:3000/graphql

curl -XPOST -H "Content-Type:application/x-www-form-urlencoded;charset=utf-8" -d "nick_name=ly&account=lyun&email=1518550424@qq.com&password=123456&location=china&qq=1518550424&img_url=http://img4.imgtn.bdimg.com/it/u=2904687606,3420353024&fm=21&gp=0.jpg&github=fengyun2" http://localhost:3000/user/add
```
get: 请求

注意: -g 参数去掉curl的解析(因为url中包含了curl不能解析字符串, 但是是合法的 uri)

```shell
curl -g "http://localhost:3000/graphql?query={user(id:\"1\"){name}}"
curl -g "http://localhost:3000/graphql?query={user(id:\"1\"){id,name}}"

curl -g "http://localhost:3000/user/lists"
```

