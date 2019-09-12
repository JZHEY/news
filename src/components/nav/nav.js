import navTpl from './nav.tpl'
import itemTpl from './item.tpl'
import './nav.scss'
import {tplReplace} from '../../utils/tools'

export default () => {
    return {
        name:'nav',
        tpl(newsType){
            // console.log(newsType)
            let len = newsType.length,
                wrapperW = (6 * len) + 'rem'
            
            let navStr = '',
                itemsStr = ''
            
            // console.log("wrapperW" + wrapperW)
            navStr = navTpl().replace(tplReplace(),wrapperW)

            newsType.forEach((item,index) => {
                // console.log(item)
                itemsStr += itemTpl().replace(tplReplace(),(node,key) => {
                    return {
                        isCurrent: index === 0 ? 'current' : '',
                        type: item.type,
                        typeName: item.chs
                    }[key]
                })
            });
            return{
                navStr,
                itemsStr
            }
        }
    }
}