import NewsList from './news_list.js'
import tpl_0 from './news_tpl0.tpl'
import tpl_1 from './news_tpl1.tpl'
import tpl_2 from './news_tpl2.tpl'
import tpl_3 from './news_tpl3.tpl'
import './news_list.scss'
import { replaceRegExp } from '../../util/tools'

export default () => {
    return {
        name:'newsList',
        tpl(newsData,pageNum){
            console.log(pageNum)
            var listStr = '',
                template = ''
            newsData.forEach((item,index) => {
                if(item.thumbnail_pic_s03){
                    // console.log('---3---',item.author_name)
                   template = tpl_3()
                }else if(!item.thumbnail_pic_s03 && item.thumbnail_pic_s02){
                    // console.log('---2---',item.author_name)
                    template = tpl_2()
                }else if(!item.thumbnail_pic_s02 && item.thumbnail_pic_s){
                    // console.log('---1---',item.author_name)
                    template = tpl_1()
                }else{
                    // console.log('---0---',item.author_name)
                    template = tpl_0()
                }

                listStr += template.replace(replaceRegExp(), (node,key) => {
                    return {
                        pageNum,
                        index,
                        url:item.url,
                        uniquekey:item.uniquekey,
                        title:item.title,
                        thumbnail_pic_s:item.thumbnail_pic_s,
                        thumbnail_pic_s02:item.thumbnail_pic_s02,
                        thumbnail_pic_s03:item.thumbnail_pic_s03,
                        author:item.author_name,
                        date:item.date
                    }[key]
                })
            });

            // console.log(listStr)

            return listStr
        }
    }
}