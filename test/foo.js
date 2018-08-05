var i = require("../")
  , tap = require("tap")
  , test = tap.test
  , fs = require("fs")
  , path = require("path")
  , fixture = path.resolve(__dirname, "./fixtures/foo.ini")
  , data = fs.readFileSync(fixture, "utf8")
  , d
  , expectE = '\to = p\n'
            + '\ta with spaces = b  c\n'
            + '\t" xa  n          p " = "\\"\\r\\nyoyoyo\\r\\r\\n"\n'
            + '\t"[disturbing]" = hey you never know\n'
            + '\ts = something\n'
            + '\ts1 = \"something\'\n'
            + '\ts2 = something else\n'
            + 'zr[] = deedee\n'
            + 'ar[] = one\n'
            + 'ar[] = three\n'
            + 'ar[] = this is included\n'
            + '\tbr = warm\n'
            + '\teq = \"eq=eq\"\n'
            + '[remote "a"]\n'
            + '\turl = 1\n'
            + '\tpushurl = 2\n'
            + '\tpushurl = 3\n'
            + '\tpushurl = 4\n'
            + '[a]\n'
            + '\tav = a val\n'
            + '\te = { o: p, a: '
            + '{ av: a val, b: { c: { e: "this [value]" '
            + '} } } }\n\tj = "\\"{ o: \\"p\\", a: { av:'
            + ' \\"a val\\", b: { c: { e: \\"this [value]'
            + '\\" } } } }\\""\n\t"[]" = a square?\n'
            + 'cr[] = four\ncr[] = eight\n'
            +'[a.b.c]\n\te = 1\n'
            + '\tj = 2\n[x\\.y\\.z]\n\tx.y.z = xyz\n'
            + '[x\\.y\\.z.a\\.b\\.c]\n\ta.b.c = abc\n'
            + '\tnocomment = this\\; this is not a comment\n'
            + '\tnoHashComment = this\\# this is not a comment\n'

  , expectD =
    { o: 'p',
      'a with spaces': 'b  c',
      " xa  n          p ":'"\r\nyoyoyo\r\r\n',
      '[disturbing]': 'hey you never know',
      'remote "a"': { url: 1, pushurl: [ 2, 3, 4 ] },
      's': 'something',
      's1' : '\"something\'',
      's2': 'something else',
      'zr': ['deedee'],
      'ar': ['one', 'three', 'this is included'],
      'br': 'warm',
      'eq': 'eq=eq',
      a:
       { av: 'a val',
         e: '{ o: p, a: { av: a val, b: { c: { e: "this [value]" } } } }',
         j: '"{ o: "p", a: { av: "a val", b: { c: { e: "this [value]" } } } }"',
         "[]": "a square?",
         cr: ['four', 'eight'],
         b: { c: { e: '1', j: '2' } } },
      'x.y.z': {
        'x.y.z': 'xyz',
        'a.b.c': {
          'a.b.c': 'abc',
          'nocomment': 'this\; this is not a comment',
          noHashComment: 'this\# this is not a comment'
        }
      }
    }
  , expectF = '[prefix.log]\n'
            + '\ttype = file\n'
            + '[prefix.log.level]\n'
            + '\tlabel = debug\n'
            + '\tvalue = 10\n'

test("decode from file", function (t) {
  var d = i.decode(data)
  t.deepEqual(d, expectD)
  t.end()
})

test("encode from data", function (t) {
  var e = i.encode(expectD)
  t.deepEqual(e, expectE)

  var obj = {log: { type:'file', level: {label:'debug', value:10} } }
  e = i.encode(obj)
  t.notEqual(e.slice(0, 1), '\n', 'Never a blank first line')
  t.notEqual(e.slice(-2), '\n\n', 'Never a blank final line')

  t.end()
})

test("encode with option", function (t) {
  var obj = {log: { type:'file', level: {label:'debug', value:10} } }
  e = i.encode(obj, {section: 'prefix'})

  t.equal(e, expectF)
  t.end()
})
