import tpl from './header.tpl'
import './header.scss'
import { replaceRegExp } from '../../util/tools'

export default () => {
    return{
        name:'header',
        tpl(options){
            console.log(options)
            return tpl().replace(replaceRegExp(),(node,key) => {
                return{
                    title:options.title,
                    iconLeft:options.iconLeft,
                    iconRight:options.iconRight,
                }[key]
            })
        }
    }
}