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
        tpl(newsData){
            var listStr = '',
                template = ''
            newsData.forEach((item,index) => {
                // console.log(item)
                if(item.thumbnail_pic_s03){
                   template = tpl_3()
                }else if(!item.thumbnail_pic_s03 && item.thumbnail_pic_s02){
                    template = tpl_2()
                }else if(!item.thumbnail_pic_s02 && item.thumbnail_pic_s01){
                    template = tpl_1()
                }else if(!item.thumbnail_pic_s01 && item.thumbnail_pic_s){
                    template = tpl_0()
                }

                listStr += template.replace(replaceRegExp(), (node,key) => {
                    return {
                        url:item.url,
                        uniquekey:item.uniquekey,
                        pageNum:item.pageNum,
                        index:item.index,
                        thumbnail_pic_s:item.thumbnail_pic_s,
                        thumbnail_pic_s02:item.thumbnail_pic_s02,
                        thumbnail_pic_s03:item.thumbnail_pic_s03,
                        author:item.author,
                        date:item.date
                    }[key]
                })
            });

            console.log(listStr)

            return{
                listStr
            }
        }
    }
}