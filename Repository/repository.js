class Repository
{
    constructor()
    {
        this.arr=[];
    }

    /*
    Functie care adauga elementul x in repository.
    in: x
    out: 1, daca elementul nu se afla in repo, 0 altfel
    pre: x-elementul de tip disciplina de adaugat in repo
    post: se adauga elementul x
    */
    add(x) 
    {
        if(this.find(x)==-1)
        {
            this.arr.push(x);
            return 1;
        }
        return 0;
    }

    /*
    Functie care returneaza pozitia unui element dat ca parametru sau -1 daca nu a fost gasit.
    in: x
    out: pos
    pre: x - element de tip disciplina
    post: se returneaza pozitia elementului sau -1 daca acesta nu a fost gasit
    */
    find(x)
    {
        var i;
        for(i=0; i<this.arr.length; i++)
            if(this.arr[i].nume==x.nume)
                return i;
        return -1;
    }

    /*
    Functie care sterge un element din repository.
    in: x
    out: 1, daca s-a sters, 0 altfel
    pre: x-element de tip disciplina
    post: se sterge elementul x
    */
    remove(x)
    {
        var pos, i;
        pos=this.find(x);
        if(pos==-1)
            return 0;
        this.arr.length--;
        for(i=pos+1; i<this.arr.length; i++)
            this.arr[i-1]=this.arr[i];
        return 1;
    }

    /*
    Functie care actualizeaza o disciplina in repository.
    in: oldItem, newItem
    out: {0, 1}
    pre: oldItem, newItem - elemente de tip disciplina
    post: se returneaza 1 daca a fost actualizata disciplina, 0 altfel
    */
    update(oldItem, newItem)
    {
        if(this.find(oldItem)==-1)
            return 0;
        this.remove(oldItem);
        this.add(newItem);
        return 1;
    }

    /*
    Functie care returneaza toate disciplinele sub forma de array.
    in: -
    out: arr
    pre: -
    post: se returneaza un array ce contine disciplinele din repository
    */
    getAll()
    {
        return this.arr;
    }

    /*
    Functie care sterge toate elementele din repository.
    in: -
    out: -
    pre: -
    post: se sterg toate elementele din repository
    */
    removeAll()
    {
        this.arr=[];
    }
}
