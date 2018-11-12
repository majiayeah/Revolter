
import { randint } from "./util/random.js"

export default class Option {
    constructor(appName = "Revolter", name = appName + "Options") {
        this.appName = appName
        this.name = name

        this.options = Object.assign({},
            Option.getDefaultOptions(),
            this.restore()
        )

        this.save()
    }

    set(key, value) {
        this.options[key] = value
        this.save()
    }

    get(key) {
        return this.options[key]
    }

    getAll() {
        return this.options
    }

    restore() {
        return JSON.parse(
            top.localStorage.getItem(this.name)
        )
    }

    save() {
        top.localStorage.setItem(this.name, JSON.stringify(this.options))
    }

    clear() {
        this.options = Option.getDefaultOptions()
        this.save()
    }

    static getDefaultOptions() {
        return ({
            port: randint(60000, 65500)
        })
    }
}
