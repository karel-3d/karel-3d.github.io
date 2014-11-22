---
layout: eman
title: eman corpman random notes
---

Really random notes. I should probably delete this

---

* `eman vars corpus`

  * this shows all the corpus steps with vars

  * *eman vars*, not *eman var*

* **everytime any corpus is behaving weird, reindex corpman**

  * it's more often broken than not

* `./corpman -dump nameoofcorpus` prints corpus to STDOUT. The first dash is important, otherwise it crashes.

* `eman sel t corpus f` displays all failed corpus steps.
   * `rm -rf $( eman sel t corpus f )` deletes all failed corpus steps.

* `corpman.rules` is doing something.

* `eman init -start` is with one dash, not two

--------

* is it better to count BLEU on tokenized or untokenized corpus?
* if I let corpman create all the corpus steps and then I just say "run" to the main evaluator, it creates tens jobs, then tries to run them all at once, which somehow messes up AFS and corpman.index, so suddenly everything fails.
  * => it is safer to go through all the corpus steps one by one
* corpman also somehow magically tries to run the corpus creation in the INIT step in some cases (???????)
  * what the hell

