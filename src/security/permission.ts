import { Role } from "../model/user.model";

const permissions = new Map<Role, string[]>()

function permitFor(role: Role, routes: string[]) {
    permissions.set(role, routes)
}
const openRoutes = [
    '/auth',
    '^/admin',
]

permitFor(Role.User, [
    '^/api'
])

permitFor(Role.Admin, [
])

export const isOpen = (route: string) => {
    return openRoutes!.some(exp => {
        return new RegExp(exp).test(route)
    })
}

export const isPermitted = (route: string, role: Role) => {
    console.log('is permitted: ', route, role);
    
    return permissions.get(role)!.some(exp => {
        return new RegExp(exp).test(route)
    })
}