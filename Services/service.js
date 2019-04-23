class Service
{
    constructor(repo)
    {
        this.repo=repo;
    }

    /*
    Functie care adauga o disciplina in repository.
    in: nume, tip, nrOre
    out: 1, daca s-a adaugat, 0 altfel
    */
    addDisciplina(nume, tip, nrOre)
    {
        var d=new Disciplina(nume, tip, nrOre);
        return this.repo.add(d);
    }

    /*
    Functie care returneaza o lista cu disciplinele din repository.
    in: -
    out: lst
    pre: -
    post: lst contine disciplinele
    */
    getAll()
    {
        return this.repo.getAll();
    }

    /*
    Functie care actualizeaza o disciplina, cautand-o dupa nume, numele neputand fi modificat.
    in: nume, tip, nrOre
    out: indicele randului din tabel(fara header) pe care se afla disciplina
    pre: nume-numele disciplinei, tip-tipul nou, nrOre-nr de ore actualizat
    post: se actualizeaza atat in memorie cat si in tabel disciplina data
    */
    updateDisciplina(nume, tip, nrOre)
    {
        if(nume=="" || nrOre<=0 || isNaN(nrOre))
            throw "Date invalide!";
        var newItem=new Disciplina(nume, tip, nrOre);
        var oldItem=new Disciplina(nume, "", 0);
        var index=this.repo.find(oldItem);
        if(this.repo.update(oldItem, newItem)==0)
            throw "Disciplina nu exista!";
        return index+1;
    }

    /*
    Functie care sorteaza un tabel folosind BubbleSort.
    in: n
    out: -
    pre: n - indexul coloanei
    post: tabelul este sortat dupa coloana selectata
    */
    sortTable(n)
    {
        var table, i, j, rows, done=false, change, x, y;
        table=document.getElementById("tabel_discipline");
        while(!done)
        {
            done=true;
            rows=table.rows;
            for(i=1; i<(rows.length-1); i++)
            {
                change=false;
                x = rows[i].cells[n];
                y = rows[i + 1].cells[n];
                if(x.innerHTML.toLowerCase()>y.innerHTML.toLowerCase())
                {
                    change=true;
                    break;
                }
            }
            if(change)
            {
                done=false;
                rows[i].parentNode.insertBefore(rows[i+1], rows[i]);
            }
        }
    }

    /*
    Functie care sterge randul r.
    in: r
    out: -
    pre: r-obiect de tip button, button aflandu-se pe randul ce se vrea a fi sters
    post: se sterge din tabel randul pe care se afla butonul r
    */
    delete(r) 
    {
        var i = r.parentNode.parentNode.rowIndex;
        var nume=document.getElementById("tabel_discipline").rows[i].cells.item(0).innerHTML;
        var d=new Disciplina(nume, "", 0);
        this.repo.remove(d);
        document.getElementById("tabel_discipline").deleteRow(i);
    }

    /*
    Functie care sterge atat din memorie cat si din tabel toate disciplinele.
    in: -
    out: -
    pre: -
    post: se sterg disciplinele din tabel si memorie
    */
    removeAll()
    {
        var tab = document.getElementById("tabel_discipline");
        var rowCount = tab.rows.length;
        for (var x=rowCount-1; x>0; x--)
            tab.deleteRow(x);
        this.repo.removeAll();
    }
}
