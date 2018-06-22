exports.errorResp = (r, err, cod = 400, msn = "Error en el procedimiento") => {
    return r.status(cod).json({
        ok: false,
        err,
        msn
    });
}

exports.coolResp = (r, cod = 200, msn = "Procedimiento realizado con exito") => {
    return r.status(cod)
        .json({
            ok: true,
            msn
        });
}

exports.validRespond = (r, aux) => {
    if (!aux) {
        return r.status(400).json({
            ok: false,
            err: {
                message: 'registro no encontrado'
            }
        });
    } else {
        if (aux.password) {
            aux = modifyPass(aux);
        }
        r.json({
            ok: true,
            aux
        });

    }
};

exports.rightLoginRespond = (r, aux, menu) => {
    aux.password = '';
    r.json({
        ok: true,
        aux,
        token: aux.token,
        menu
    });
};

modifyPass = (aux) => {
    aux.password = '';
    if (aux instanceof Array)
        aux.forEach(e => e.password = "");
    return aux;
};

exports.pagination = (r, aux, model) => {
    if (!aux) {
        return r.status(400).json({
            ok: false,
            err: {
                message: 'registro no encontrado'
            }
        });
    } else {
        if (aux.length > 0) {
            if (aux[0].password) {
                aux = modifyPass(aux);
            }
        }
        model.count({}, (err, c) => {
            r.json({
                ok: true,
                total: c,
                aux
            });
        })
    }
}