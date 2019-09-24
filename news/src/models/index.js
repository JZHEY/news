import { HTTP } from '../util/HTTP'

class IndexModel extends HTTP {
    getNewsList(field,showPage){
        console.log(field)
        return new Promise ((resolve,reject) => {
            this.ajax({
                type:'POST',
                url:'/Juhe/getNewsList',
                dataType:'json',
                data:{
                    field
                },
                success:function(data){
                    // console.log(data.result.data)
                    var allnews = data.result.data
                    var newsData = []
                    for (var i=0; i< allnews.length;){
                        newsData.push(allnews.slice(i,i += showPage))
                    }
                    // console.log(newsData)
                    resolve(newsData)
                }
            })
        })
    }
}

export { IndexModel }