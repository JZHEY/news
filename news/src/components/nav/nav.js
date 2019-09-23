import navTpl from './nav.tpl'
import itemTpl from './item.tpl'
import { replaceRegExp } from '../../util/tools'
import './nav.scss'

export default () => {
    return {
        name:'nav',
        tpl(newsType){
            let len = newsType.length,
                navWidth = (len * 6) + 'rem'

            let navStr = '',
                itemStr = ''

            navStr = navTpl().replace(replaceRegExp(),navWidth)

            newsType.forEach((item,index)=> {
                itemStr += itemTpl().replace(replaceRegExp(),(node,key) => {
                    return {
                        isCurrent:index === 0 ? 'current' : '',
                        typeName:item.chs,
                        itemType:item.type
                    }[key]
                })
            });
            console.log(navStr,itemStr)

            return {
                navStr,
                itemStr
            }
        }
    }
}