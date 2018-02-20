module.exports = function(RED) {
    function ConfigNode(n) {
        RED.nodes.createNode(this,n);
        this.apiKEY = n.apiKEY;
    }
    RED.nodes.registerType("aprsfi-config",ConfigNode);
}