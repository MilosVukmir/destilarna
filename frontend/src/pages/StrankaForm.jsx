function StrankaForm({
    novaStranka,
    setNovaStranka,
    onSubmit,
    onCancel,
    urejanjeId,
}) {
    return (
        <div className="modal-overlay">
            <div className="form-modal">
                <h2 className="form-title">
                    {urejanjeId ? "Uredi stranko" : "Dodaj stranko"}
                </h2>

                <form onSubmit={onSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Ime ali naziv</label>
                        <input className="form-control"
                        type="text"
                        value={novaStranka.ime_ali_naziv}
                        onChange={(e) => 
                            setNovaStranka({
                                ...novaStranka,
                                ime_ali_naziv: e.target.value,
                            })
                        }
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Telefon</label>
                        <input className="form-control"
                        type="text"
                        value={novaStranka.telefon}
                        onChange={(e) =>
                            setNovaStranka({
                                ...novaStranka,
                                telefon: e.target.value,
                            })
                        }
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">E naslov</label>
                        <input className="form-control"
                        type="text"
                        value={novaStranka.e_naslov}
                        onChange={(e) =>
                            setNovaStranka({
                                ...novaStranka,
                                e_naslov: e.target.value,
                            })
                        }
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Naslov</label>
                        <input className="form-control"
                        type="text"
                        value={novaStranka.naslov}
                        onChange={(e) =>
                            setNovaStranka({
                                ...novaStranka,
                                naslov: e.target.value,
                            })
                        }
                        />
                    </div>

                    <div className="mb-3">
                    <label className="form-label">Tip stranke</label>
                    <select className="form-control"
                            value={novaStranka.tip_stranke}
                            onChange={(e) =>
                            setNovaStranka({...novaStranka,
                            tip_stranke: e.target.value,
                        })
                    }>
                    <option value="">Izberi tip stranke</option>
                    <option value="fizična">Fizična</option>
                    <option value="pravna">Pravna</option>
                    </select>
                    </div>

                    <div className="d-flex justify-content-end gar-2">
                        <button type="button" className="btn btn-secondary" onClick={onCancel}>
                            Prekliči
                        </button>

                        <button type="submit" className="btn btn-add-modal">
                            {urejanjeId ? "Shrani" : "Dodaj"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default StrankaForm;