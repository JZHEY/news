import '../scss/detail.scss'
import Header from '../components/header/index'


const App = ($) => {
    const header = new Header()
    const $app = $('#app')

    const init = () => {
        render()
    }

    const render = () => {
        _headerRender()
    }

    const _headerRender = () => {
        $app.append(header.tpl({
            title:'详情',
            showLeftIcon:false,
            showRightIcon:false
        }))
    }

    init()
}

App(Zepto)