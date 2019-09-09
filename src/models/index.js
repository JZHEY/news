import { HTTP } from '../utils/http'

class IndexModel extends HTTP{
    getNewsList(field,showPage){
        return new Promise((resolve,reject) => {
            this.ajax({
                type:'POST',
                url:'/Juhe/getNewsList',
                dataType:'json',
                data:{
                    field
                },
                success:function(res){
                    console.log(res)
                    let listDatas = res.result.data,
                          len = listDatas.length
                          
                    
                    let pageData = [],
                          index = 0
                          
                    while(index < len){
                        pageData.push(listDatas.slice(index,index + showPage))
                        index = index + showPage
                    }
                    
                    resolve(pageData)
                }
            })
            
        })
        
    }
}

export { IndexModel }