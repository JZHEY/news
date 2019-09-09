import tpl_0 from './tpl/tpl_0.tpl'
import tpl_1 from './tpl/tpl_1.tpl'
import tpl_2 from './tpl/tpl_2.tpl'
import tpl_3 from './tpl/tpl_3.tpl'
import './news_item.scss'
import { tplReplace } from '../../utils/tools'

export default () => {
    return {
        name:'newsItem',
        tpl(data,numPage){
            let list = '',
                tempalte = ''
            
            data.forEach(item => {
                if(item.thumbnail_pic_s03){
                    tempalte = tpl_3()
                }else if (!item.thumbnail_pic_s03 && item.thumbnail_pic_s02){
                    tempalte = tpl_2()
                }else if(!item.thumbnail_pic_s02 && item.thumbnail_pic_s01){
                    tempalte = tpl_1()
                }else {
                    tempalte = tpl_0()
                }

                list += tempalte.replace(tplReplace(),(node,key) => {
                    return {
                        pageNum:item.pageNum,
                        index:item.index,
                        uniquekey:item.uniquekey,
                        url:item.url,
                        title:item.title,
                        author:item.author_name,
                        date:item.date,
                        thumbnail_pic_s:item.thumbnail_pic_s,
                        thumbnail_pic_s02:item.thumbnail_pic_s02,
                        thumbnail_pic_s03:item.thumbnail_pic_s03
                    }[key]
                })
            });

            return list
        }
    }
}