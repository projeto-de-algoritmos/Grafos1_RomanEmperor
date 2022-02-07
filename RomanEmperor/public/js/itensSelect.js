


//gerar as op��es pro select
function geraOptions(vet, id) {

    let optionSelect = document.getElementById(id)
    for (let i = 0; i < vet.length; i++) {
        let option = document.createElement("option")
        option.value = vet[i]
        option.text = vet[i]
        optionSelect.appendChild(option)

    }

}

function listarArrays() {

    var idDinastia = "select-dinastia";
    var idNome = "select-nome";
    var idCidadeNatal = "select-cidade";
    var idCausaMorte = "select-causa";
    var dinastia = ['Dinastia',
        'Constantinian',
        'Gordian',
        'Julio-Claudian',
        'Flavian',
        'Severan',
        'Nerva-Antonine',
        'Valentinian',
        'Theodosian']
    var nome = ['Nome',
        'Galerius',
        'Lucinius',
        'Philip I',
        'Trebonianus Gallus',
        'Balbinus',
        'Aurelian',
        'Numerian',
        'Carinus',
        'Tiberius',
        'Galba',
        'Didius Julianus',
        'Geta',
        'Carus',
        'Julian',
        'Constans',
        'Augustus',
        'Trajan Decius',
        'Tacitus',
        'Probus',
        'Elagabalus',
        'Maximinus I',
        'Gallienus',
        'Gordian I',
        'Marcus Aurelius',
        'Domitian',
        'Vitellius',
        'Constantius I',
        'Hostilian',
        'Caracalla',
        'Claudius Gothicus',
        'Constantine II',
        'Jovian',
        'Gordian II',
        'Pupienus',
        'Constantine the Great',
        'Severus Alexander',
        'Diocletian',
        'Valens',
        'Valentinian II',
        'Valentinian I',
        'Theodosius I',
        'Vespasian',
        'Commodus',
        'Pertinax',
        'Hadrian',
        'Trajan',
        'Otho',
        'Macrinus',
        'Quintillus',
        'Florian',
        'Nero',
        'Vetranio',
        'Severus II',
        'Claudius',
        'Lucius Verus',
        'Septimus Severus',
        'Antonius Pius',
        'Nerva',
        'Caligula',
        'Titus',
        'Gratian',
        'Maximian',
        'Valerian',
        'Aemilian',
        'Maximinus II',
        'Maxentius',
        'Gordian III',
        'Constantius II'];
    var cidadeNatal = ['Cidade natal',
        'Romuliana',
        'Felix Romuliana',
        'Shahba',
        '',
        'Sirmium',
        'Rome',
        'Terracina',
        'Milan',
        'Narbo',
        'Constantinople',
        'Budalia',
        'Interamna Nahars',
        'Emesa',
        'Dardania',
        'Lugdunum',
        'Arelate',
        'Singidunum',
        'Naissus',
        'Arca Caesarea',
        'Salona',
        'Cibalae',
        'Cauca',
        'Falacrine',
        'Lanuvium',
        'Alba',
        'Italica',
        'Terentinum',
        'Iol Caesarea',
        'Antitum',
        'Leptis Magna',
        'Narni',
        'Sirmium'];
    var causaMorte = ['Causa da morte',
        'Natural Causes',
        'Execution',
        'Assassination',
        'Unknown',
        'Died in Battle',
        'Suicide',
        'Captivity'];
    geraOptions(dinastia, idDinastia);
    geraOptions(nome, idNome);
    geraOptions(cidadeNatal, idCidadeNatal);
    geraOptions(causaMorte, idCausaMorte);
}


listarArrays()




