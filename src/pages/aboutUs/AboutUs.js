import React from "react";
import NProgress from "nprogress";
import "./aboutUs.scss";

export class AboutUs extends React.Component {
  UNSAFE_componentWillMount() {
    NProgress.start();
    document.title = "About Us – F-mania";
  }
  componentDidMount() {
    NProgress.done();
  }
  render() {
    return (
      <section className="about-us">
        <div className="container">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
          mattis augue vel leo malesuada euismod. Nam faucibus venenatis ipsum
          at rhoncus. Sed aliquam commodo ligula, vitae venenatis felis
          tristique in. Nulla id varius lacus. Donec sit amet urna in metus
          malesuada suscipit at gravida ipsum. Etiam malesuada justo ut luctus
          sodales. Fusce id vehicula dolor. Integer eget magna purus. Praesent
          eget mauris metus. Duis hendrerit sem eget molestie pellentesque.
          Integer venenatis aliquet mattis. Mauris est diam, vestibulum id
          semper suscipit, dignissim quis magna. Sed at purus elementum, egestas
          libero placerat, pretium enim.
          <br />
          <br />
          Nulla dictum, massa non facilisis hendrerit, turpis mauris aliquam
          nibh, eu suscipit risus ipsum sed ex. In luctus eros ut sapien
          laoreet, sit amet placerat augue dignissim. Pellentesque pretium dui
          at justo luctus, quis sagittis sem feugiat. Fusce laoreet sapien
          augue, at semper magna gravida ac. Pellentesque quis est non urna
          posuere sodales ac et ante. Duis at purus mollis arcu tincidunt
          lobortis ac eget mauris. Nam pulvinar lacus in metus eleifend tempus.
          Maecenas at condimentum quam, iaculis ultrices tortor. Suspendisse
          quis dolor condimentum, vestibulum turpis sed, interdum urna. Proin
          posuere, urna vel vestibulum suscipit, nibh libero blandit ex, sit
          amet viverra elit ligula ac justo. Nulla pellentesque augue in
          faucibus fringilla. Phasellus eros dolor, mollis a diam ut, fringilla
          laoreet ligula. Class aptent taciti sociosqu ad litora torquent per
          conubia nostra, per inceptos himenaeos. Integer vel nunc sed erat
          blandit viverra eget vitae tortor. Nulla fringilla nisi auctor,
          vehicula leo id, lacinia erat.
          <br />
          <br />
          Integer elementum quam nibh, cursus hendrerit eros imperdiet dictum.
          Suspendisse at pulvinar sem. Praesent suscipit sit amet mi quis
          consectetur. Suspendisse rutrum nec dolor in cursus. Maecenas ut
          scelerisque lectus. Sed aliquet auctor sollicitudin. Donec elit metus,
          lacinia ut vestibulum quis, porta nec erat. Nulla eget mi non purus
          consectetur pellentesque. Aenean sit amet cursus lacus. Sed at nisl a
          risus hendrerit congue. Etiam viverra tincidunt lectus, molestie
          volutpat nunc consectetur sed. Maecenas rhoncus congue mi, vitae
          iaculis sem scelerisque ut. Curabitur sit amet turpis ac leo tempus
          sodales. Vestibulum urna dolor, tempor ut fermentum in, blandit non
          velit. Sed hendrerit rutrum interdum. Nullam gravida blandit magna,
          non viverra sem laoreet in.
          <br />
          <br />
          Cras sit amet felis sed risus auctor vehicula. Maecenas tellus justo,
          ultrices et elit sit amet, egestas bibendum leo. Praesent nec dapibus
          sem, vel egestas nisi. Pellentesque habitant morbi tristique senectus
          et netus et malesuada fames ac turpis egestas. Maecenas tempus posuere
          turpis quis consectetur. Nullam non egestas nibh. Etiam in est vitae
          metus dapibus vestibulum vitae a purus. Nam mi dolor, aliquet quis
          malesuada in, scelerisque eget felis. Quisque elementum enim sit amet
          posuere gravida. Mauris ullamcorper rhoncus magna, in posuere risus
          dictum eget. Etiam congue eu felis sed facilisis. Morbi in felis vitae
          turpis ultricies viverra eu in nulla.
          <br />
          <br />
          Ut efficitur ipsum vel lectus lacinia, at accumsan lacus luctus.
          Integer tincidunt, nisl at pretium pharetra, tellus nibh blandit
          lorem, eu semper neque eros vitae nisi. Aliquam facilisis gravida
          nulla eu cursus. Sed sit amet velit varius, feugiat massa sit amet,
          volutpat diam. Donec vitae mauris id lorem pretium vehicula sit amet
          vitae justo. Nulla condimentum faucibus libero dictum finibus. Sed ac
          ante nec orci dapibus tristique id sit amet purus. Nullam euismod
          venenatis lacus vitae blandit. Curabitur id nisl convallis, feugiat
          arcu ut, blandit tellus. Integer at lorem in nunc sagittis volutpat.
          In quis pulvinar sapien. Mauris erat ligula, dapibus vitae placerat
          eget, pulvinar in nibh. Etiam consequat, orci id finibus volutpat,
          nisl nisi commodo purus, sit amet elementum neque nisl non ipsum.
          Curabitur fringilla bibendum lacus, eu fringilla eros ullamcorper ac.
          Curabitur accumsan ornare ante, sagittis efficitur quam tristique vel.
          Mauris interdum mauris ut congue ornare.
        </div>
      </section>
    );
  }
}
