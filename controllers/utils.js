exports.errorResp = (r, err, cod = 400, msn = "Error en el procedimiento") => {
    return r.status(cod).json({
        ok: false,
        err,
        msn
    });
}

exports.coolResp = (r, cod = 200, msn = "Procedimiento realizado con exito") => {
    return r.status(cod).json({
        ok: true,
        msn
    });
}

exports.validRespond = (r, user) => {
    if (!user) {
        return r.status(400).json({
            ok: false,
            err: {
                message: 'usuario no encontrado'
            }
        });
    } else {
        user.password = '';
        if (user instanceof Array)
            user.forEach(e => e.password = "");
        r.json({
            ok: true,
            user
        });

    }
};
exports.rightLoginRespond = (r, user) => {
    user.password = '';
    r.json({
        ok: true,
        user,
        token: user.token
    });
};