Header.$inject = ['Icons'];

function Header(Icons) {
    this.helpIcon = Icons.HELP;
    this.moreIcon = Icons.MORE;
    this.namespace = 'engineering';
}

export default Header;
