module WordLists
    PRE_K_SPELLING_WORDS = {
    description: "Preschool Spelling Words List",
    url: 'https://media.time4learning.com/uploads/PreKSpellingWordList.pdf',
words: %w[one two three at bat cat mat pat rat sat an can fan man pan ran tan cap map nap tap sap bag wag tag rag gag
are ask as or mom and us pad sad an can fan pan ran van bed led red get let jet met net pet set wet den
big dig fig pig wig fin in pin win bid did hid rid if is hip sip tip dip lip hop mop pop top dot got hot 
her hi bye bee see cow how now bun fun run sun but cut gut hut nut rut bus us cup up pup cub rub tub bug
am dam ham jam ram yam bad dad had mad jar tar by dry my all am
hen men pen ten beg leg peg keg egg bit fit hit
it kit mit pit sit
not pot rot ox box fox pox job mob rob sob hi bye bee see is his
dug hug mug rug tug a
be he me see she we go so bar car far].sort.uniq,
}

FIRST_GRADE_READING_WORDS = {
    group: 'education.com',
    url: 'https://www.education.com/magazine/article/firstgradesightwords/',
description: 'Sight Words for 1st Graders to be Able to Read by the End of 1st Grade',
words: %w[
about
each
if
nice
than
walk
after
every
jump
now
thank
want
again
find
just
old
their
way
also
first
keep
only
them
went
another
from
kind
or
then
were
any
funny
know
other
these
when
ask
give
learn
over
thing
where
back
going
live
people
think
which
because
great
long
put
use
word
been
had
many
rain
very
work
before
hers
may
right
 
would
by
high
more
should
 
write
could
house
much
some
 
your
day
how
 
 
 
yours
].sort.uniq,
}

FIRST_GRADE_READ_WRITE = {
    group: 'education.com',
    url: 'https://www.education.com/magazine/article/firstgradesightwords/',
    description: 'Words for 1st Graders to be Able to Read, Write, and Spell by the End of 1st Grade',
words: %w[
a
came
had
make
people
ten
walk
all
can
has
many
play
than
want
am
come
have
me
please
thank
was
an
day
he
more
pretty
that
we
and
did
her
much
purple
the
were
any
do
here
must
put
them
what
are
down
hers
my
ran
then
when
as
eat
him
new
red
there
where
ask
eight
his
nice
run
these
which
at
find
how
nine
said
they
white
ate
five
if
no
saw
thing
who
away
for
in
not
say
this
why
be
four
into
now
see
three
with
because
from
is
of
seven
to
went
been
get
it
on
she
too
work
before
girl
jump
one
six
two
yellow
big
go
like
only
small
up
yes
black
going
little
or
so
very
you
blue
good
look
orange
some
 
your
boy
great
 
other
soon
 
 
brown
green
 
our
 
 
 
but
 
 
out
 

 
by
 
 
over
 
 
 
 
 
 
 
 
 
].sort.uniq,
}
ALL = {PRE_K_SPELLING_WORDS:PRE_K_SPELLING_WORDS, FIRST_GRADE_READING_WORDS:FIRST_GRADE_READING_WORDS, FIRST_GRADE_READ_WRITE:FIRST_GRADE_READ_WRITE}
end