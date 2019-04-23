class UI
{
    constructor(serviceObject)
    {
        this.srv=serviceObject;
    }

    /*
    Functie care adauga un rand nou in tabel.
    in: nume, tip, nrOre, table, index
    out: -
    pre: nume, tip, nrOre - datele de adaugat; table-tabelul, index-nr liniei
    post: se adauga randul
    */
    insertNewRow(nume, tip, nrOre, table, index)
    {
        var row=table.insertRow(index);
        var cell1=row.insertCell(0);
        var cell2=row.insertCell(1);
        var cell3=row.insertCell(2);
        var cell4=row.insertCell(3);
        //add values
        cell1.innerHTML=nume;
        cell2.innerHTML=tip; 
        cell3.innerHTML=nrOre;
        //add delete button
        var btn = document.createElement("button");
        btn.innerHTML = "Stergere";
        btn.setAttribute("onclick", "ui.srv.delete(this)"); //functia din service apelata cu butonul actual ca parametru
        cell4.appendChild(btn);
        row.appendChild(cell4);
    }

    /*
    Functie care adauga o disciplina noua atat in tabel cat si in repository.
    in: nume, tip, nrOre
    out: -
    */
    addDisciplina(nume, tip, nrOre)
    {
        if(nume=="" || nrOre<=0 || isNaN(nrOre))
        {
            alert("Date invalide!");
            return;
        }
        if(!this.srv.addDisciplina(nume, tip, nrOre))  //add in repo
        {
            alert("Exista deja o disciplina cu acelasi nume!");
            return;
        }
        var table=document.getElementById("tabel_discipline");
        var index = document.getElementById('tabel_discipline').rows.length;
        this.insertNewRow(nume, tip, nrOre, table, index);
        //free the form
        document.getElementById("nume").value="";
        document.getElementById("tip").selectedIndex=0;
        document.getElementById("nrOre").value="";
    }

    /*
    Functie care actualizeaza o disciplina existenta atat in tabel cat si in repository.
    in: nume, tip, nrOre
    out: -
    */
    updateDisciplina(nume, tip, nrOre)
    {
        try{
        var index=this.srv.updateDisciplina(nume, tip, nrOre);
        var table=document.getElementById("tabel_discipline");
        table.deleteRow(index); 
        var index = document.getElementById('tabel_discipline').rows.length;
        this.insertNewRow(nume, tip, nrOre, table, index);
        }
        catch(e){
            alert(e);
        }
    }

    /*
    Functie care reseteaza tabelul la valorile initiale.
    */
    resetTable()
    {
        this.srv.removeAll();
        this.addDisciplina("Disciplina1", "Obligatorie", 3);
        this.addDisciplina("Disciplina2", "Optionala", 5);
        this.addDisciplina("Disciplina3", "Obligatorie", 2);
        this.addDisciplina("Disciplina4", "Facultativa", 7);
    }
}
