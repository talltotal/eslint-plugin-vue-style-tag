'use strict'

function isStyleElement(node) {
    return node.type === 'VElement' && node.name === 'style'
}

function isNotScopeStyle (styleNode) {
    return (styleNode.startTag.attributes || []).every(attribute => {
        return attribute.key.name !== 'scoped' && attribute.key.name !== 'module'
    })
}

module.exports = {
    rules: {
        'use-scoped-or-module': {
            meta: {
                docs: {
                    description: 'ESLint plugin to require Vue style tags with scoped or module attribute.',
                },
            },

            create (context) {
                const rootAST =
                    context.parserServices.getDocumentFragment &&
                    context.parserServices.getDocumentFragment()
                
                if (rootAST) {
                    const styles = rootAST.children.filter(isStyleElement)

                    const notScopeStyleNodes = styles.filter(isNotScopeStyle)
            
                    notScopeStyleNodes.forEach(node => {
                        context.report({
                            node: node,
                            loc: node.startTag.loc,
                            message: 'The <style> tag should have scoped or module attribute.',
                        })
                    })
                }

                return {}
            }
        }
    }
}
